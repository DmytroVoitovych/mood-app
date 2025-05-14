<template>
  <el-input
    v-model="moodState.journalEntry"
    maxlength="150"
    placeholder="Today, I felt…"
    show-word-limit
    :rows="5"
    type="textarea"
    class="text-preset-6-italic"
  />
</template>

<script lang="ts" setup>
import { useGlobalMoodState } from "~/composables/globalMoodState";

const moodState = useGlobalMoodState();
</script>

<style lang="scss" scoped>
.el-textarea {
  --el-input-border-color: var(--neutral-300);
  --el-input-border-radius: 10px;
  --el-input-bg-color: var(--neutral-100);
  --el-input-placeholder-color: var(--neutral-600);
  --el-input-text-color: var(--neutral-900);
  --el-input-word-limit-color: var(--blue-600);
  --el-input-focus-border-color: var(--blue-600);
  --el-color-info: var(--neutral-600);

  :deep(.el-input__count) {
    font-family: RedditSans;
    font-size: 13px;
    font-weight: 600;
    line-height: 1;
    background-color: transparent;
    margin-left: auto;
    display: block;
    position: unset;
    text-align: end;
    margin-top: 8px;
  }
}

:deep(.el-textarea__inner) {
  padding: 12px 16px;
  box-shadow: 0 1px 2px 0 rgba(33, 33, 77, 0.05);
  border: 1px solid var(--neutral-300);
}
</style>
