import { createGlobalState, useSessionStorage } from "@vueuse/core";

type MoodForm = {
  mood: string;
  feelings: string[];
  journalEntry: string;
  sleepHours: string;
};

export const useGlobalMoodState = createGlobalState(() =>
  useSessionStorage<MoodForm>("mood-user-data", {
    mood: "",
    feelings: [],
    journalEntry: "",
    sleepHours: "",
  }),
);
