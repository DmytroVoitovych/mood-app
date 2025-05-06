import { createGlobalState } from "@vueuse/core";
import { shallowRef } from "vue";

export const useGlobalProfileState = createGlobalState(() => {
  const profileName = shallowRef("Anonimous");
  const avatar = shallowRef("~/assets/images/avatar-placeholder.svg");
  return { profileName, avatar };
});
