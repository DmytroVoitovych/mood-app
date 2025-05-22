<template>
  <BarPopover v-if="currentBar">
    <div class="moodBar">
      <component :is="mood[currentBar.mood]?.imageWhite || ''"></component>
    </div>
    <template #popoverContent>
      <ul class="text-preset-8 popoverList">
        <li>
          Mood<el-text class="text-preset-7"
            ><component width="16" height="16" :is="mood[currentBar.mood]?.imgSvg || ''"></component
            >{{ mood[currentBar.mood].text }}</el-text
          >
        </li>
        <li>
          Sleep<el-text class="text-preset-7">{{ dreamText }}</el-text>
        </li>
        <li>
          Reflection<el-text class="text-preset-7">{{ currentBar.journalEntry }}</el-text>
        </li>
        <li>
          Tags<el-text class="text-preset-7">{{ currentBar.feelings.join(", ") }}</el-text>
        </li>
      </ul>
    </template>
  </BarPopover>
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
  "1": { percent: 23, text: "0-2 hours" },
  "3.5": { percent: 43, text: "3-4 hours" },
  "5.5": { percent: 63, text: "5-6 hours" },
  "7.5": { percent: 83, text: "7-8 hours" },
  "9": { percent: 102, text: "9+ hours" },
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
  if (!currentBar.value?.sleepHours) return sleep["1"].percent;
  return sleep[currentBar.value.sleepHours as keyof typeof sleep].percent || sleep["1"].percent;
});

const dreamText = computed(() => {
  if (!currentBar.value?.sleepHours) return sleep["1"].text;
  return sleep[currentBar.value.sleepHours as keyof typeof sleep].text || sleep["1"].text;
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

  & {
    background-color: v-bind(bgColor);
    width: 40px;
    padding: 5px;
    border-radius: 999px;
    bottom: calc(100% + var(--pad-gap));
    position: absolute;
    height: calc(
      (100% + var(--box-pad-gap) + var(--pad-gap) + var(--box-height)) * v-bind(dreamPercentage) /
        100
    );

    svg {
      display: block;
      margin: auto;
      margin-top: 0;
    }

    @media (hover: hover) {
      cursor: pointer;
    }
  }
}

.popoverList {
  display: grid;
  gap: 12px;

  li {
    --el-text-color-regular: var(--neutral-900);
    gap: 6px;
    display: grid;

    &:first-child .el-text {
      display: flex;
      align-items: center;
      gap: 6px;
    }
  }
}
</style>
