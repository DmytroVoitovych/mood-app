<template>
  <el-radio-group v-model="moodState[currentModel]">
    <el-radio
      class="text-preset-5"
      :value="item.value"
      v-for="item of renderListDepensOnStep[currentModel]"
      :key="item.text"
      >{{ item.text }} <component class="radio-svg-ico" v-if="'imgSvg' in item" :is="item?.imgSvg"
    /></el-radio>
  </el-radio-group>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { HappyIco, NeutralIco, SadIco, VeryHappyIco, VerySadIco } from "~/assets/iconImport";
import { useGlobalMoodState } from "~/composables/globalMoodState";

const renderListDepensOnStep = {
  mood: [
    { value: 2, text: "Very Happy", imgSvg: VeryHappyIco },
    { value: 1, text: "Happy", imgSvg: HappyIco },
    { value: 0, text: "Neutral", imgSvg: NeutralIco },
    { value: -1, text: "Sad", imgSvg: SadIco },
    { value: -2, text: "Very Sad", imgSvg: VerySadIco },
  ],
  sleepHours: [
    { value: 1, text: "0–2 hours" },
    { value: 3.5, text: "3–4 hours" },
    { value: 5.5, text: "5–6 hours" },
    { value: 7.5, text: "7–8 hours" },
    { value: 9, text: "9+ hours" },
  ],
} as const;

const props = defineProps<{ step: number }>();

const moodState = useGlobalMoodState();

const currentModel = computed(() => {
  return props.step === 1 ? "mood" : "sleepHours";
});
</script>

<style lang="scss" scoped>
.el-radio-group {
  --el-color-primary: var(--blue-600);
  --el-border-radius-base: 10px;
  --el-radio-size: 24px;
  --el-radio-icon-checked-color: var(--blue-600);
  --el-radio-icon-checked-border-color: var(--blue-600);
  --el-radio-icon-checked-bg-color: var(--blue-600);
  --el-radio-icon-disabled-color: var(--neutral-400);
  --el-radio-icon-disabled-border-color: var(--neutral-400);

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;

  .el-radio {
    --el-radio-font-size: 20px;
    --el-radio-text-color: var(--neutral-900);
    --el-radio-input-height: 20px;
    --el-radio-input-width: 20px;

    display: flex;
    align-items: center;
    gap: 12px;
    margin-right: 0;
    padding: 12px 20px;
    height: auto;
    align-self: stretch;
    border-radius: var(--el-border-radius-base);
    border: 2px solid var(--blue-100);
    background-color: var(--neutral-0);

    :deep(.el-radio__input.is-checked) + .el-radio__label {
      --el-color-primary: var(--neutral-900);
    }

    &.is-checked {
      border-color: var(--blue-600);
    }

    :deep(.el-radio__label) {
      font-size: var(--el-radio-font-size);
      padding-left: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-grow: 1;
    }

    &:not(.is-checked) :deep(.el-radio__inner) {
      border: 1.5px solid var(--blue-200);
    }

    :deep(.el-radio__inner)::after {
      width: 10px;
      height: 10px;
    }

    .radio-svg-ico {
      width: var(--emoji-width);
      height: var(--emoji-width);
    }
  }
}
</style>
