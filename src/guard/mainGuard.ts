import { Auth } from "firebase/auth";
import { NavigationGuardNext, RouteLocationNormalizedLoadedGeneric } from "vue-router";
import { GlobalProfileState } from "~/composables/globalProfileState";

export const authGuard = async (
  to: RouteLocationNormalizedLoadedGeneric,
  from: RouteLocationNormalizedLoadedGeneric,
  next: NavigationGuardNext,
  auth: Auth,
  state: GlobalProfileState,
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

  if (
    !to.meta.requiresAuth &&
    isLoggedIn &&
    !state.value.isAboard &&
    to.name !== "/auth/OnBoarding"
  ) {
    next({ name: "/auth/OnBoarding" });
    return;
  }

  next();
};
