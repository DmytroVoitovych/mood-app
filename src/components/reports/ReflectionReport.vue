<template>
  <el-text class="text-preset-6"
    ><ReflectionIco width="22" height="22" />Reflection of the day</el-text
  >
  <el-text class="text-preset-6" type="primary"> {{ currentReflection }}</el-text>
</template>

<script setup lang="ts">
import { ReflectionIco } from "~/assets/iconImport";
import { useGlobalProfileState } from "~/composables/globalProfileState";
import { getCurrentDate } from "../../core/utils/helpers";
import { MoodForm } from "~/core/types/types";
import { computed } from "vue";

const state = useGlobalProfileState();
const date = getCurrentDate();

const currentReflection = computed(() => {
  const data = state.value.logData as Record<string, MoodForm>;
  return data[date]?.journalEntry || "No reflection yet";
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
