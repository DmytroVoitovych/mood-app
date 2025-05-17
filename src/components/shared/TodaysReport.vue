<template>
  <div class="todaysReportBlock">
    <slot></slot>
    <slot name="tags"></slot>
  </div>
</template>

<style lang="scss" scoped>
.todaysReportBlock {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  background-color: var(--neutral-0);
  border: 1px solid var(--blue-100);
  border-radius: 16px;
  align-items: flex-start;

  &:has(:nth-child(3)) {
    min-height: 197px;
  }
}
</style>
