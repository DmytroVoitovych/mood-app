<template>
  <div class="tagsBlock">
    <el-text class="text-preset-6-italic" v-for="tag of currentTags" :key="tag"
      >#{{ tag }}
    </el-text>
  </div>
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
.tagsBlock {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-right: auto;
  margin-top: auto;
}

.el-text {
  --el-text-color-regular: var(--neutral-600);
  --el-color-primary: var(--neutral-900);
}
</style>
