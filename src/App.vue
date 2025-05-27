<template>
  <RouterView />
</template>

<script lang="ts" setup>
import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";
import { onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useGlobalProfileState } from "./composables/globalProfileState";
import { authGuard } from "./core/guard/mainGuard";
import { directRouteProtection } from "./core/guard/guardFromDirectIn";
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
    if (user) syncData(state, user);
    directRouteProtection(user, state, router, route);
  });
});

watch(
  () => state.value,
  (newState, oldState) => {
    if (JSON.stringify(newState) !== JSON.stringify(oldState) && auth.currentUser) {
      syncData(state, auth.currentUser);
    }
  },
);
</script>
<style></style>
