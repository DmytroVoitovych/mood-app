<template>
  <el-form ref="formRef" :model="moodState" @submit.prevent="currentEmitHandler" :rules="rules">
    <el-form-item :prop="keyListFromMoodState[step - 1]">
      <slot name="formContent"></slot>
      <template #error>
        <span class="is-error text-preset-9"
          ><LogoCircle width="12" height="12" />{{ errInfo }}</span
        >
      </template>
    </el-form-item>
    <el-button class="text-preset-4" native-type="submit" type="primary" size="large"
      ><slot name="moodBtn"></slot
    ></el-button>
  </el-form>
</template>

<script lang="ts" setup>
import { FormInstance, FormRules } from "element-plus";
import { ref } from "vue";
import { computed, onMounted, reactive, useTemplateRef } from "vue";
import { LogoCircle } from "~/assets/iconImport";
import { MoodForm, useGlobalMoodState } from "~/composables/globalMoodState";

const emit = defineEmits<{
  nextStep: [];
  submitForm: [];
}>();
const props = defineProps<{ step: number }>();

const moodState = useGlobalMoodState();
const keyListFromMoodState = Object.keys(moodState.value) as Array<keyof MoodForm>;

const errInfo = ref("");

const formRef = useTemplateRef<FormInstance>("formRef");
const rules = reactive<FormRules<MoodForm>>({
  mood: [
    {
      required: true,
      message: "Please select a mood before continuing.",
      validator: (r, val) => {
        errInfo.value = r.message as string;
        return val !== "";
      },
      trigger: "change",
    },
  ],
  feelings: [{ message: "Please select a mood before continuing.", trigger: "change" }],
  journalEntry: [{ message: "Please write about your day before continuing.", trigger: "change" }],
  sleepHours: [
    {
      required: true,
      message: "Please select a mood before continuing.",
      validator: (r, val) => {
        console.log(r);
        return val !== "";
      },
      trigger: "change",
    },
  ],
});

const currentEmitHandler = computed(() => {
  return props.step === 4
    ? () => emit("submitForm")
    : () =>
        formRef.value?.validate((valid) => {
          if (valid) emit("nextStep");
        });
});

onMounted(() => console.log(formRef.value?.fields));
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
