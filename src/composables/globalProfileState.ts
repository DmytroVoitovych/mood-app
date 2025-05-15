import { createGlobalState, createSharedComposable, useStorage } from "@vueuse/core";
import { AvatarPlaceholder } from "~/assets/iconImport";

export const initialData = {
  profileName: "Anonimous",
  avatar: AvatarPlaceholder,
  isAboard: false,
  email: "",
  logData: {},
};

export const useGlobalProfileState = createSharedComposable(
  createGlobalState(() =>
    useStorage("profile-data", {
      profileName: "Anonimous",
      avatar: AvatarPlaceholder,
      isAboard: false,
      email: "",
      logData: {},
    }),
  ),
);
