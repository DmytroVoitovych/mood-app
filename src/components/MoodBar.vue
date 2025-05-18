<template>
  <div v-if="currentBar" class="moodBar">
    <component :is="mood[currentBar.mood]?.imageWhite || ''"></component>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import {
  HappyIco,
  HappyWhiteIco,
  NeutralIco,
  NeutralWhiteIco,
  SadIco,
  SadWhiteIco,
  VeryHappyIco,
  VeryHappyWhiteIco,
  VerySadIco,
  VerySadWhiteIco,
} from "~/assets/iconImport";
import { MoodForm } from "~/composables/globalMoodState";
import { useGlobalProfileState } from "~/composables/globalProfileState";

const props = defineProps<{
  date: string;
  height: string;
}>();

const state = useGlobalProfileState();

const mood: Record<string, { text: string; imgSvg: string; imageWhite: string; bgVar: string }> = {
  "2": {
    text: "Very Happy",
    imgSvg: VeryHappyIco,
    imageWhite: VeryHappyWhiteIco,
    bgVar: "var(--amber-300)",
  },
  "1": { text: "Happy", imgSvg: HappyIco, imageWhite: HappyWhiteIco, bgVar: "var(--green-300)" },
  "0": {
    text: "Neutral",
    imgSvg: NeutralIco,
    imageWhite: NeutralWhiteIco,
    bgVar: "var(--blue-300)",
  },
  "-1": { text: "Sad", imgSvg: SadIco, imageWhite: SadWhiteIco, bgVar: "var(--indigo-200)" },
  "-2": {
    text: "Very Sad",
    imgSvg: VerySadIco,
    imageWhite: VerySadWhiteIco,
    bgVar: "var(--red-300)",
  },
};

const currentBar = computed<MoodForm | undefined>(() => {
  const data = state.value.logData as Record<string, MoodForm>;
  return data[props.date];
});

const bgColor = computed(() => {
  if (!currentBar.value?.feelings.length) return "transparent";
  return mood[currentBar.value?.mood].bgVar;
});
</script>

<style lang="scss" scoped>
.moodBar {
  background-color: v-bind(bgColor);
  width: 40px;
  padding: 5px;
  border-radius: 999px;

  svg {
    display: block;
    margin: auto;
    margin-top: 0;
  }
}
</style>
