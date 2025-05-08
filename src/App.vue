<template>
  <RouterView />
</template>

<script lang="ts" setup>
import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";
import { onMounted } from "vue";
import { NavigationGuardNext, RouteLocationNormalizedLoadedGeneric, useRouter } from "vue-router";
import { useGlobalProfileState } from "./composables/globalProfileState";

let auth: Auth;
const router = useRouter();
const state = useGlobalProfileState();

const authGuard = (
  to: RouteLocationNormalizedLoadedGeneric,
  from: RouteLocationNormalizedLoadedGeneric,
  next: NavigationGuardNext,
) => {
  const isLoggedIn = !!auth.currentUser;

  // const hasResetCode = to.query.oobCode || to.query.mode === "resetPassword";

  // if (hasResetCode) {
  //   const resetParams = {
  //     oobCode: to.query.oobCode,
  //     mode: to.query.mode,
  //   };

  //   next({ path: "/reset-password", query: resetParams });
  //   return;
  // }

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: "/auth/SignIn" });
    return;
  }

  if (!to.meta.requiresAuth && isLoggedIn && state.value.isAboard) {
    next({ name: "/" });
    return;
  }

  if (!to.meta.requiresAuth && isLoggedIn && !state.value.isAboard) {
    next({ name: "/auth/OnBoarding" });
    return;
  }

  next();
};

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    console.log(user, "state was changed");
    if (user) router.push({ name: "/" });
    router.beforeEach(authGuard);
    if (!user) {
      router.push({ name: "/auth/SignIn" });
    }
  });
});
</script>
<style></style>
