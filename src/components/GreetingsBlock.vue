<template>
  <div class="grettingsBlock">
    <div class="grettingsBlock__info">
      <el-text type="primary" class="gretting" :class="isMediumScreen && 'text-preset-3'"
        >Hello, {{ state.profileName }}!</el-text
      >
      <h1 class="grettingsBlock__title" :class="titleClass">How are you feeling today?</h1>
      <el-text class="currentDate text-preset-6">
        <time :datetime="CURRENT_DATE">{{ CURRENT_DATE }}</time></el-text
      >
    </div>
    <el-button class="text-preset-5" type="primary" size="large">Log today's mood</el-button>
  </div>
</template>

<script lang="ts" setup>
import { useMediaQuery } from "@vueuse/core";
import { useGlobalProfileState } from "~/composables/globalProfileState";
import { getCurrentDate } from "./helpers";
import { computed } from "vue";

const CURRENT_DATE = getCurrentDate();
const isMediumScreen = useMediaQuery("(min-width: 530px)");
const state = useGlobalProfileState();

const titleClass = computed(() => {
  return isMediumScreen.value ? "text-preset-1" : "text-preset-1-mobile";
});
</script>

<style lang="scss" scoped>
.grettingsBlock__info {
  padding-top: 48px;
  padding-bottom: 48px;
  text-align: center;

  & > *:not(:last-child) {
    margin-bottom: 16px;
  }

  .grettingsBlock__title {
    color: var(--neutral-900);
  }
}
.gretting {
  display: block;
  font-family: RedditSans;
  font-size: 24px;
  font-weight: bold;
  line-height: 1.3;
  letter-spacing: -0.3px;
}

.el-text {
  --el-text-color-regular: var(--neutral-600);
  --el-color-primary: var(--blue-600);
}

.el-button {
  --el-color-primary: var(--blue-600);
  --el-button-size: 60px;
  --el-border-radius-base: 10px;

  display: block;
  margin: 0 auto;
}
</style>
