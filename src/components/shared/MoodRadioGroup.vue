<template>
  <el-radio-group v-model="moodState[currentModel]">
    <el-radio :value="3">Option A</el-radio>
    <el-radio :value="6">Option B</el-radio>
    <el-radio :value="9">Option C</el-radio>
  </el-radio-group>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useGlobalMoodState } from "~/composables/globalMoodState";

const props = defineProps<{ step: number }>();

const moodState = useGlobalMoodState();

const currentModel = computed(() => {
  return props.step === 1 ? "mood" : "sleepHours";
});
</script>
