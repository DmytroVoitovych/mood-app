<template>
  <el-form :model="moodState" @submit.prevent="currentEmitHandler">
    <slot name="formContent"></slot>
    <el-button class="text-preset-4" native-type="submit" type="primary" size="large"
      ><slot name="moodBtn"></slot
    ></el-button>
  </el-form>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useGlobalMoodState } from "~/composables/globalMoodState";

const emit = defineEmits<{
  nextStep: [];
  submitForm: [];
}>();
const props = defineProps<{ step: number }>();

const moodState = useGlobalMoodState();
// const labelArr = Object.keys(moodState.value);

const currentEmitHandler = computed(() => {
  return props.step === 4 ? () => emit("submitForm") : () => emit("nextStep");
});
</script>

<style lang="scss" scoped>
.el-button {
  --el-color-primary: var(--blue-600);
  --el-button-size: 66px;
  --el-border-radius-base: 10px;

  display: block;
  margin: 0 auto;
  width: 100%;
}
</style>
