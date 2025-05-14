<template>
  <el-checkbox-group v-model="moodState.feelings">
    <el-checkbox
      class="text-preset-6-regular"
      v-for="mood of moodsList"
      :key="mood"
      :label="mood"
      :value="mood"
      border
    />
  </el-checkbox-group>
</template>

<script lang="ts" setup>
import { useGlobalMoodState } from "~/composables/globalMoodState";

const moodsList = [
  "Joyful",
  "Down",
  "Anxious",
  "Calm",
  "Excited",
  "Frustrated",
  "Lonely",
  "Grateful",
  "Overwhelmed",
  "Motivated",
  "Irritable",
  "Peaceful",
  "Tired",
  "Hopeful",
  "Confident",
  "Stressed",
  "Content",
  "Disappointed",
  "Optimistic",
  "Restless",
] as const;

const moodState = useGlobalMoodState();
</script>

<style lang="scss" scoped>
.el-checkbox-group {
  --el-color-primary: var(--blue-600);
  --el-border-radius-base: 10px;

  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  .el-checkbox {
    --el-checkbox-checked-text-color: var(--neutral-900);
    --el-checkbox-text-color: var(--neutral-900);
    --el-checkbox-input-border: 2px solid var(--blue-200);
    --el-checkbox-input-height: 16px;
    --el-checkbox-input-width: 16px;
    --el-checkbox-border-radius: 4px;

    padding: 12px 16px;
    margin-right: 0;
    height: auto;
    background-color: var(--neutral-0);

    :deep(.el-checkbox__label) {
      font-family: "RedditSans", sans-serif;
      font-weight: 400;
      font-size: 18px;
      line-height: 1.4;
    }
  }

  .el-checkbox:not(.is-checked).is-bordered {
    border: 1.5px solid var(--blue-100);
  }
}
</style>
