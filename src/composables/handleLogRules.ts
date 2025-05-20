import { reactive, ref } from "vue";
import { MoodForm } from "./globalMoodState";
import { FormRules } from "element-plus";

export const useLogRules = () => {
  const errInfo = ref("");
  const rules = reactive<FormRules<MoodForm>>({
    mood: [
      {
        required: true,
        message: "Please select a mood before continuing.",
        validator: (r, val) => {
          const isValid = val !== "";
          errInfo.value = isValid ? "" : (r.message as string);
          return isValid;
        },
      },
    ],
    feelings: [
      {
        message: "You can only select a maximum of 3 tags and minimum 1.",
        validator: (r, val) => {
          const isValid = val.length <= 3 && val.length > 0;
          errInfo.value = isValid ? "" : (r.message as string);
          return isValid;
        },
      },
    ],
    journalEntry: [
      {
        message: "Please write a few words about your day before continuing.",
        validator: (r, val: string) => {
          const isValid = !!val.trim().length;
          errInfo.value = isValid ? "" : (r.message as string);
          return isValid;
        },
      },
      { message: "Please write a few words about your day before continuing.", trigger: "blur" },
    ],
    sleepHours: [
      {
        required: true,
        message: "Please select a sleep hour before continuing.",
        validator: (r, val) => {
          const isValid = val !== "";
          errInfo.value = isValid ? "" : (r.message as string);
          return isValid;
        },
      },
    ],
  });

  return {
    rules,
    errInfo,
  };
};
