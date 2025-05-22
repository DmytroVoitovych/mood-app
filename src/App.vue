<template>
  <RouterView />
</template>

<script lang="ts" setup>
import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";
import { onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useGlobalProfileState } from "./composables/globalProfileState";
import { authGuard } from "./guard/mainGuard";
import { directRouteProtection } from "./guard/guardFromDirectIn";
import { useDataBaseByFirebase } from "./firebase/useFirebaseHelperFunctions";

let auth: Auth;
const router = useRouter();
const route = useRoute();
const state = useGlobalProfileState();
const { syncData } = useDataBaseByFirebase();

router.beforeEach((...rest) => authGuard(...rest, auth, state));

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    console.log(user, "state was changed", state);
    if (user) syncData(state, user);
    directRouteProtection(user, state, router, route);
  });
});

watch(
  () => state.value,
  (n, p) => {
    if (JSON.stringify(n) !== JSON.stringify(p) && auth.currentUser) {
      syncData(state, auth.currentUser);
    }
  },
);
</script>
<style></style>
