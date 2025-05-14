<template>
  <el-dialog v-model="centerDialogVisible" :show-close="false" ref="dialogRef">
    <template #header>
      <h2 class="moodLogModal__title" :class="titleClass">Log your mood</h2>
      <ul class="stepsList">
        <li
          v-for="n of 4"
          :key="'step ' + n"
          class="stepsList__item"
          :class="n <= dialogStapStore.step && 'passed'"
        ></li>
      </ul>
    </template>
    <div class="moodLogModal__content">
      <h3 class="moodLogModal__content--question" :class="questionClass">
        {{ STATIC_MOOD_DATA.questions[dialogStapStore.step - 1] }}
      </h3>
      <MoodForm
        :step="dialogStapStore.step"
        @next-step="dialogStapStore.step++"
        @submit-form="afterSubmit"
      >
        <template #formContent>
          <component
            :is="STATIC_MOOD_DATA.components[dialogStapStore.step - 1]"
            :step="dialogStapStore.step"
          />
        </template>

        <template #moodBtn> {{ btnContent }} </template>
      </MoodForm>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { useMediaQuery, useSessionStorage } from "@vueuse/core";
import { DialogInstance } from "element-plus";
import { computed, useTemplateRef } from "vue";
import MoodRadioGroup from "./shared/MoodRadioGroup.vue";

const STATIC_MOOD_DATA = {
  questions: [
    "How was your mood today?",
    "How did you feel?",
    "Write about your day...",
    "How many hours did you sleep last night?",
  ],
  components: [MoodRadioGroup, , , MoodRadioGroup],
};
const dialogRef = useTemplateRef<DialogInstance>("dialogRef");

const centerDialogVisible = defineModel<boolean>("centerDialogVisible");
const dialogStapStore = useSessionStorage("dialogStep", {
  step: 1,
});

const isMediumScreen = useMediaQuery("(min-width: 530px)");

const titleClass = computed(() => (isMediumScreen.value ? "text-preset-2" : "text-preset-3"));
const btnContent = computed(() => (dialogStapStore.value.step === 4 ? "Submit" : "Continue"));
const questionClass = computed(() => {
  return isMediumScreen.value ? "text-preset-3" : "text-preset-3-mobile";
});

const afterSubmit = () => {
  dialogRef.value?.handleClose();
  dialogStapStore.value.step = 1;
};
</script>
<style lang="scss" scoped>
.moodLogModal__title {
  color: var(--neutral-900);
  margin-bottom: 24px;

  @include mq(medium) {
    margin-bottom: 32px;
  }
}

.moodLogModal__content {
  &--question {
    color: var(--neutral-900);
    margin-bottom: 24px;

    @include mq(medium) {
      margin-bottom: 32px;
    }
  }
}

.stepsList {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;

  @include mq(medium) {
    margin-bottom: 32px;
  }

  &__item {
    width: 100%;
    height: 6px;
    background-color: var(--blue-200);
    border-radius: 999px;

    &.passed {
      background-color: var(--blue-600);
    }
  }
}
</style>
