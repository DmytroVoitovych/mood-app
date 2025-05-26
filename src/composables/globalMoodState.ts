import { createGlobalState, useSessionStorage } from "@vueuse/core";
import { MoodForm } from "~/core/types/types";

export const useGlobalMoodState = createGlobalState(() =>
  useSessionStorage<MoodForm>("mood-user-data", {
    mood: "",
    feelings: [],
    journalEntry: "",
    sleepHours: "",
  }),
);
