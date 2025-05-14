import { createGlobalState, useSessionStorage } from "@vueuse/core";

export type MoodForm = {
  mood: number | string;
  feelings: string[];
  journalEntry: string;
  sleepHours: number | string;
};

export const useGlobalMoodState = createGlobalState(() =>
  useSessionStorage<MoodForm>("mood-user-data", {
    mood: "",
    feelings: [],
    journalEntry: "",
    sleepHours: "",
  }),
);
