<template>
  <RouterView />
</template>

<script lang="ts" setup>
import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";
import { onMounted } from "vue";
import { NavigationGuardNext, RouteLocationNormalizedLoadedGeneric, useRouter } from "vue-router";
import { useGlobalProfileState } from "./composables/globalProfileState";
import { collection, getDocs, getFirestore } from "firebase/firestore";

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
    console.log("state.value.isAboard", state.value.isAboard, to.meta.requiresAuth);
    next({ name: "/" });
    return;
  }

  if (
    !to.meta.requiresAuth &&
    isLoggedIn &&
    !state.value.isAboard &&
    to.name !== "/auth/OnBoarding"
  ) {
    console.log("state.value.isAboard", state.value.isAboard, to.meta.requiresAuth);
    next({ name: "/auth/OnBoarding" });
    return;
  }

  next();
};

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    console.log(user, "state was changed");
    if (user && state.value.isAboard) {
      // вынести в отдельный хук
      getDocs(collection(getFirestore(), "users", user.uid, "mood-data")).then((querySnapshot) => {
        const userMoodList = querySnapshot.docs.reduce((acc, doc) => {
          Object.assign(acc, doc.data());
          return acc;
        }, {});

        if (JSON.stringify(userMoodList) !== JSON.stringify(state.value.logData)) {
          state.value.logData = userMoodList;
        }
      });

      router.push({ name: "/" });
    }
    router.beforeEach(authGuard);
    if (!user) {
      router.push({ name: "/auth/SignIn" });
    }
  });
});
</script>
<style></style>
