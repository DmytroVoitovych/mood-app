import { createGlobalState, createSharedComposable, useStorage } from "@vueuse/core";

export const initialData = {
  profileName: "Anonimous",
  avatar: "",
  isAboard: false,
  email: "",
  logData: {},
};

export const useGlobalProfileState = createSharedComposable(
  createGlobalState(() =>
    useStorage("profile-data", {
      profileName: "Anonimous",
      avatar: "",
      isAboard: false,
      email: "",
      logData: {},
    }),
  ),
);

export type GlobalProfileState = ReturnType<typeof useGlobalProfileState>;
