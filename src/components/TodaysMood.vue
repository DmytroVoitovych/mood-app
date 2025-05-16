<template>
  <div class="todaysMood">
    <h4 class="todaysMood__title">
      <el-text>I’m feeling</el-text>
      {{ currentMood?.text }}
    </h4>
    <component :is="currentMood?.imgSvg"></component>
    <p class="todaysMood__moto">"{{ randomQuote }}"</p>
  </div>
</template>

<script lang="ts" setup>
import { HappyIco, NeutralIco, SadIco, VeryHappyIco, VerySadIco } from "~/assets/iconImport";
import { useGlobalProfileState } from "~/composables/globalProfileState";
import { getCurrentDate } from "./helpers";
import { computed } from "vue";
import { MoodForm } from "~/composables/globalMoodState";
import moto from "~/staticData/moodQuotes.json";

const state = useGlobalProfileState();
const date = getCurrentDate();

const mood = [
  { value: 2, text: "Very Happy", imgSvg: VeryHappyIco },
  { value: 1, text: "Happy", imgSvg: HappyIco },
  { value: 0, text: "Neutral", imgSvg: NeutralIco },
  { value: -1, text: "Sad", imgSvg: SadIco },
  { value: -2, text: "Very Sad", imgSvg: VerySadIco },
];

const currentMood = computed(() => {
  const data = state.value.logData as Record<string, MoodForm>;
  const currentMood = data[date].mood;

  return (
    mood.find((item) => item.value === currentMood) || {
      value: 0,
      text: "Neutral",
      imgSvg: NeutralIco,
    }
  );
});

const randomInteger = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomQuote = computed(() => {
  const quotes =
    moto.moodQuotes[currentMood.value.value.toString() as keyof typeof moto.moodQuotes];
  const num = randomInteger(0, quotes.length - 1);

  return quotes[num];
});

console.log(randomQuote.value);
</script>
<style lang="scss" scoped></style>
