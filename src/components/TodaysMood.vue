<template>
  <div class="todaysMood">
    <h4 class="todaysMood__title text-preset-2">
      <el-text class="text-preset-3">I’m feeling</el-text>
      {{ currentMood?.text }}
    </h4>
    <component class="todaysMood__emoji" :is="currentMood?.imgSvg"></component>
    <i class="todaysMood__moto text-preset-6-italic">"{{ randomQuote }}"</i>
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
  const currentMood = data[date]?.mood || [];

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
</script>
<style lang="scss" scoped>
.todaysMood {
  --local-padding-horizontal: 16px;
  --local-padding-vertical: 32px;

  display: grid;
  place-items: center;
  grid-template-rows: auto 1fr auto;
  gap: 32px;
  padding: 32px var(--local-padding-horizontal);
  background-color: var(--neutral-0);
  border: 1px solid var(--blue-100);
  border-radius: 16px;
  grid-row: 1 / span 2;

  @include mq(medium) {
    --local-padding-horizontal: 32px;

    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto 1fr;
    overflow: hidden;
    row-gap: 0;
    max-height: 340px;
  }

  &__emoji {
    width: calc((100% / 2) + var(--local-padding-vertical) + var(--local-padding-horizontal));
    max-width: 322px;

    @include mq(medium) {
      grid-row: auto / span 2;
      transform: translateY(64px);
      min-width: 320px;
    }
  }

  &__moto {
    color: var(--neutral-900);

    &::before {
      content: "";
      display: block;
      width: 24px;
      height: 24px;
      background-image: url("~/assets/images/icon-quote.svg");
      background-size: cover;
      justify-self: center;
      margin-bottom: 17px;

      @include mq(medium) {
        justify-self: left;
      }
    }

    @include mq(medium) {
      align-self: end;
      justify-self: left;
    }
  }

  &__title {
    color: var(--neutral-900);
    text-align: center;

    @include mq(medium) {
      justify-self: left;
      text-align: left;
    }

    & > .el-text {
      --el-text-color-regular: color-mix(in srgb, var(--neutral-900) 70%, transparent);

      display: block;
    }
  }
}
</style>
