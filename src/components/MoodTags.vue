<template>
  <el-text class="text-preset-6-italic" v-for="tag of currentTags" :key="tag">#{{ tag }} </el-text>
</template>

<script lang="ts" setup>
import { useGlobalProfileState } from "~/composables/globalProfileState";
import { getCurrentDate } from "./helpers";
import { computed } from "vue";
import { MoodForm } from "~/composables/globalMoodState";

const state = useGlobalProfileState();
const date = getCurrentDate();

const currentTags = computed(() => {
  const data = state.value.logData as Record<string, MoodForm>;
  return data[date]?.feelings;
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
  margin-top: auto;
}
</style>
