<template>
  <el-text class="text-preset-6"><SleepIco width="22" height="22" /> Sleep</el-text>
  <el-text class="text-preset-3" type="primary"> {{ currentSleepTime }}</el-text>
</template>

<script setup lang="ts">
import { SleepIco } from "~/assets/iconImport";
import { useGlobalProfileState } from "~/composables/globalProfileState";
import { getCurrentDate } from "./helpers";
import { MoodForm } from "~/composables/globalMoodState";
import { computed } from "vue";

const state = useGlobalProfileState();
const date = getCurrentDate();

const HOURS_OBJ = {
  1: "0–2 hours",
  3.5: "3–4 hours",
  5.5: "5–6 hours",
  7.5: "7–8 hours",
  9: "9+ hours",
} as const;

const currentSleepTime = computed(() => {
  const data = state.value.logData as Record<string, MoodForm>;
  return HOURS_OBJ[data[date].sleepHours as keyof typeof HOURS_OBJ];
});
</script>

<style lang="scss" scoped>
.el-text {
  --el-text-color-regular: var(--neutral-600);
  --el-color-primary: var(--neutral-900);

  display: flex;
  align-items: center;
  gap: 12px;
  margin-right: auto;
}
</style>
