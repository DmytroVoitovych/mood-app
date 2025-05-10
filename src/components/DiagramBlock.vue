<template>
  <div class="diagramBlock">
    <h3 :class="titleClass" class="diagramBlock__title">Mood and sleep trends</h3>
    <div class="segementsBlock">
      <ul class="hoursList">
        <li v-for="(item, index) in HOURS_ARR" :key="index" class="hoursList__item">
          <div class="hoursList__item--text">
            <SleepIco width="10" height="10" /> <el-text class="text-preset-9">{{ item }}</el-text>
          </div>
          <el-divider />
        </li>
      </ul>
      <ul class="timeCurveList">
        <li v-for="date of DATE_LIST" :key="date" class="timeCurveList__item">
          <slot :name="date"></slot>
          <el-text class="text-preset-9">{{ String(leterRegex.exec(date)) }}</el-text>
          <strong class="text-preset-8 timeCurveList__num">{{
            String(numberRegex.exec(date))
          }}</strong>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMediaQuery } from "@vueuse/core";
import { computed } from "vue";
import { SleepIco } from "~/assets/iconImport";
import { createDateList } from "./helpers";

const HOURS_ARR: readonly string[] = [
  "9+ hours",
  "7-8 hours",
  "5-6 hours",
  "3-4 hours",
  "0-2 hours",
];

const DATE_LIST = createDateList(11);
const leterRegex = /[A-Za-z]+/;
const numberRegex = /[0-9]+/;

const isMediumScreen = useMediaQuery("(min-width: 530px)");

const titleClass = computed(() => {
  return isMediumScreen.value ? "text-preset-3" : "text-preset-3-mobile";
});
</script>
<style lang="scss" scoped>
.diagramBlock {
  overflow-x: hidden;
  &__title {
    color: var(--neutral-900);
    margin-bottom: 20px;
  }
}

.hoursList {
  margin-bottom: 55px;

  &__item:not(:last-child) {
    margin-bottom: 40px;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 12px;

    &--text {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }
  }
}

.timeCurveList {
  display: flex;
  justify-self: end;
  justify-content: space-between;
  gap: 16px;
  width: calc(100% - 80px);
  overflow-x: auto;
  overflow-y: hidden;
  padding-left: 12px;
  padding-right: 12px;
  scrollbar-width: thin;
  scrollbar-color: var(--blue-200) transparent;

  @include mq(medium) {
    padding-left: 0;
    padding-right: 0;
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }

  &__num {
    color: var(--neutral-900);
  }
}

.el-divider {
  --el-border-color: var(--blue-100);

  width: 100%;
  margin: 0;
}

.el-text {
  --el-text-color-regular: var(--neutral-600);
}
</style>
