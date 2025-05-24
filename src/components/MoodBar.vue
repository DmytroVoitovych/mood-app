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
import { MoodForm } from "~/composables/globalMoodState";
import { useGlobalProfileState } from "~/composables/globalProfileState";
import { mood, sleep } from "./staticDataForStatistic";

const props = defineProps<{
  date: string;
  height: string;
}>();

const state = useGlobalProfileState();

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
