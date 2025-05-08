import { createGlobalState, useStorage } from "@vueuse/core";

export const useGlobalProfileState = createGlobalState(() =>
  useStorage("profile-data", {
    profileName: "Anonimous",
    avatar: "~/assets/images/avatar-placeholder.svg",
    isAboard: false,
    email: "",
  }),
);
