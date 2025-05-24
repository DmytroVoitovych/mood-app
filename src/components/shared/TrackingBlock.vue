<template>
  <div class="trackingBlock">
    <h3 class="trackingBlock__title text-preset-4"><slot>Keep tracking!</slot></h3>
    <el-text class="text-preset-7"
      ><slot name="trDescription">Log 5 check-ins to see your average mood.</slot></el-text
    >
  </div>
</template>
<script lang="ts" setup>
defineProps<{ currentColor?: string }>();
</script>

<style lang="scss" scoped>
.trackingBlock {
  padding: 40px 16px;
  border-radius: 16px;
  background-color: var(--blue-100);
  background-image: url("~/assets/images/bg-pattern-averages.svg");
  background-repeat: no-repeat;
  background-position: calc(100% + 182px);

  @include mq(medium) {
    padding: 40px 20px;
  }

  h3 {
    margin-bottom: 12px;
    color: var(--neutral-900);

    :deep(.trackSleep) {
      color: var(--neutral-0);
    }
  }
  .el-text {
    --el-text-color-regular: color-mix(in srgb, var(--neutral-900) 70%, transparent);
  }

  &:has(.trackSleep) {
    background-color: var(--blue-600);
  }

  &:has(.trackFlex) {
    background-color: v-bind(currentColor);
  }

  &:has(.trackFlex) .el-text {
    --el-text-color-regular: var(--neutral-900);
    text-wrap-style: balance;
  }

  &:has(.trackSleep) .el-text {
    --el-text-color-regular: var(--neutral-0);
    text-wrap-style: balance;
  }
}
</style>
