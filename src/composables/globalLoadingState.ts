import { createGlobalState } from "@vueuse/core";
import { shallowRef } from "vue";

export const useGlobalLoadingState = createGlobalState(() => {
  const loading = shallowRef(false);
  return { loading };
});
