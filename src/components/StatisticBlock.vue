<template>
  <div class="statisticBlock">
    <div class="statisticMoodBlock">
      <h2 class="statisticMoodBlock__title text-preset-5">
        Average Mood <el-text class="text-preset-7">(Last 5 Check-ins)</el-text>
      </h2>
      <TrackingBlock></TrackingBlock>
    </div>
    <div class="statisticSleepBlock">
      <h2 class="statisticSleepBlock__title text-preset-5">
        Average Sleep <el-text class="text-preset-7">(Last 5 Check-ins)</el-text>
      </h2>
      <TrackingBlock>
        Not enough data yet!
        <template #trDescription>Track 5 nights to view average sleep.</template></TrackingBlock
      >
    </div>
  </div>
</template>
<script lang="ts" setup></script>

<style lang="scss" scoped>
.statisticMoodBlock {
  margin-bottom: 24px;
}

h2 {
  color: var(--neutral-900);
  margin-bottom: 12px;
}

.el-text {
  --el-text-color-regular: var(--neutral-600);
}
</style>
