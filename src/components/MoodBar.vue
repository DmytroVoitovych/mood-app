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

const sleep = {
  "1": 23,
  "3.5": 43,
  "5.5": 63,
  "7.5": 83,
  "9": 100,
};

const currentBar = computed<MoodForm | undefined>(() => {
  const data = state.value.logData as Record<string, MoodForm>;
  return data[props.date];
});

const bgColor = computed(() => {
  if (!currentBar.value?.feelings.length) return "transparent";
  return mood[currentBar.value?.mood].bgVar;
});

const dreamPercentage = computed(() => {
  if (!currentBar.value?.sleepHours) return sleep["1"];
  return sleep[currentBar.value.sleepHours as keyof typeof sleep] || sleep["1"];
});
</script>

<style lang="scss" scoped>
.moodBar {
  --pad-gap: 11px;
  --box-pad-gap: 1px;
  --box-height: v-bind(height);

  @include mq(medium) {
    --box-pad-gap: 6px;
  }

  background-color: v-bind(bgColor);
  width: 40px;
  padding: 5px;
  border-radius: 999px;
  bottom: calc(100% + var(--pad-gap));
  position: absolute;
  height: calc(
    (100% + var(--box-pad-gap) + var(--pad-gap) + var(--box-height)) * v-bind(dreamPercentage) / 100
  );

  svg {
    display: block;
    margin: auto;
    margin-top: 0;
  }
}
</style>
