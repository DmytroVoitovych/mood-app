<template>
  <el-form
    ref="formRef"
    :model="moodState"
    @submit.prevent="currentEmitHandler"
    :rules="rules"
    v-bind="loading ? { inert: '' } : {}"
  >
    <el-form-item :prop="keyListFromMoodState[step - 1]">
      <slot name="formContent"></slot>
      <template #error>
        <span class="is-error text-preset-9"
          ><LogoCircle width="12" height="12" />{{ errInfo }}</span
        >
      </template>
    </el-form-item>
    <el-button
      class="text-preset-4"
      native-type="submit"
      type="primary"
      size="large"
      :disabled="!!errInfo"
      :loading="loading"
      ><slot name="moodBtn"></slot
    ></el-button>
  </el-form>
</template>

<script lang="ts" setup>
import { FormInstance } from "element-plus";
import { computed, useTemplateRef } from "vue";
import { LogoCircle } from "~/assets/iconImport";
import { useGlobalMoodState } from "~/composables/globalMoodState";
import { useLogRules } from "~/composables/handleLogRules";
import { useDataBaseByFirebase } from "~/firebase/useFirebaseHelperFunctions";
import { useGlobalLoadingState } from "~/composables/globalLoadingState";
import { useGlobalProfileState } from "~/composables/globalProfileState";
import { getCurrentDate } from "../../core/utils/helpers";
import { MoodForm } from "~/core/types/types";

const { addData } = useDataBaseByFirebase();

const emit = defineEmits<{
  nextStep: [];
  submitForm: [];
}>();
const props = defineProps<{ step: number }>();

const { errInfo, rules } = useLogRules();
const moodState = useGlobalMoodState();
const { loading } = useGlobalLoadingState();
const profileState = useGlobalProfileState();
const keyListFromMoodState = Object.keys(moodState.value) as Array<keyof MoodForm>;

const formRef = useTemplateRef<FormInstance>("formRef");

const resetMoodState = () => {
  moodState.value = {
    mood: "",
    feelings: [],
    journalEntry: "",
    sleepHours: "",
  };
};

const goToNextStep = () =>
  formRef.value?.validate((valid) => {
    if (valid) emit("nextStep");
  });

const submitForm = async () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      const date = getCurrentDate();
      loading.value = true;
      const moodData = { ...moodState.value };

      addData({ [date]: moodState.value }, () => {
        profileState.value.logData = {
          ...profileState.value.logData,
          [date]: moodData,
        };

        emit("submitForm");
        resetMoodState();
        formRef.value?.resetFields();
      });
    }
  });
};

const currentEmitHandler = computed(() => {
  return props.step === 4 ? submitForm : goToNextStep;
});
</script>

<style lang="scss" scoped>
.el-form > *:first-child {
  margin-bottom: 24px;

  @include mq(medium) {
    margin-bottom: 32px;
  }
}

:deep(.el-form-item__content) {
  display: block;

  .el-form-item__error {
    --el-color-danger: var(--red-700);
  }

  .is-error {
    position: absolute;
    top: calc(100% + 8px);
    color: var(--red-700);
    display: flex;
    gap: 6px;

    svg {
      flex-shrink: 0;
    }
  }
}

.el-button {
  --el-color-primary: var(--blue-600);
  --el-button-size: 66px;
  --el-border-radius-base: 10px;

  display: block;
  margin: 0 auto;
  width: 100%;
}
</style>
