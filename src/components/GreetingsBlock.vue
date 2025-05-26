<template>
  <div class="grettingsBlock">
    <div class="grettingsBlock__info">
      <el-text
        type="primary"
        :truncated="true"
        class="gretting"
        :class="isMediumScreen && 'text-preset-3'"
        >Hello, {{ state.profileName || "Anonimous" }}!</el-text
      >
      <h1 class="grettingsBlock__title" :class="titleClass">How are you feeling today?</h1>
      <el-text class="currentDate text-preset-6">
        <time :datetime="CURRENT_DATE">{{ CURRENT_DATE }}</time></el-text
      >
    </div>
    <section v-if="isUserMakeTodayLog" class="moodLoged">
      <TodaysMood />
      <TodaysReport><SleepReport /> </TodaysReport>
      <TodaysReport
        ><ReflectionReport />
        <template #tags>
          <MoodTags />
        </template>
      </TodaysReport>
    </section>
    <div class="logSteperBlock" v-else>
      <el-button
        class="text-preset-5"
        type="primary"
        size="large"
        @click="centerDialogVisible = !centerDialogVisible"
        >Log today's mood</el-button
      >
    </div>
    <MoodLogModal v-model="centerDialogVisible" />
  </div>
</template>

<script lang="ts" setup>
import { useMediaQuery } from "@vueuse/core";
import { useGlobalProfileState } from "~/composables/globalProfileState";
import { getCurrentDate } from "../core/utils/helpers";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useDocumentVisibility } from "@vueuse/core";
import { useRouter } from "vue-router";
import MoodLogModal from "./mood/MoodLogModal.vue";
import MoodTags from "./mood/MoodTags.vue";
import TodaysMood from "./mood/TodaysMood.vue";
import ReflectionReport from "./reports/ReflectionReport.vue";
import SleepReport from "./reports/SleepReport.vue";

const router = useRouter();
const CURRENT_DATE = ref(getCurrentDate());
const isMediumScreen = useMediaQuery("(min-width: 530px)");
const state = useGlobalProfileState();
const visibility = useDocumentVisibility();

const centerDialogVisible = ref(false);

const isUserMakeTodayLog = computed(() => CURRENT_DATE.value in state.value.logData);
const titleClass = computed(() => {
  return isMediumScreen.value ? "text-preset-1" : "text-preset-1-mobile";
});

const documentFocus = () => {
  syncDate(visibility.value);
};

const syncDate = (visible: typeof visibility.value) => {
  const nowDate = getCurrentDate();
  if (CURRENT_DATE.value !== nowDate && visible === "visible") {
    router.go(0);
  }
};

watch(() => visibility.value, syncDate);

onMounted(() => {
  window.addEventListener("focus", documentFocus);
});

onBeforeUnmount(() => {
  window.removeEventListener("focus", documentFocus);
});
</script>

<style lang="scss" scoped>
.grettingBlock {
  container-type: inline-size;
}

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

.moodLoged {
  display: grid;
  gap: 20px;

  @include mq(large) {
    grid-template-columns: 57% 1fr;
    column-gap: 32px;
  }
}
</style>
