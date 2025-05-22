import { User } from "firebase/auth";
import { RouteLocation, Router, RouteRecordNormalized } from "vue-router";
import { GlobalProfileState } from "~/composables/globalProfileState";

export const directRouteProtection = (
  user: User | null,
  state: GlobalProfileState,
  router: Router,
  route: RouteLocation,
) => {
  if (!user) {
    if (route.name !== "/auth/SignUp") router.push({ name: "/auth/SignIn" });
    return;
  }
  if (state.value.isAboard) router.push({ name: "/" });
  else router.push({ name: "/auth/OnBoarding" });
};
