<template>
  <div class="statisticBlock">
    <div class="statisticMoodBlock">
      <h2 class="statisticMoodBlock__title text-preset-5">
        Average Mood <el-text class="text-preset-7">(Last 5 Check-ins)</el-text>
      </h2>
      <TrackingBlock :currentColor>
        <div v-if="averageMoodFiveDays?.length" class="trackFlex">
          <component
            width="24"
            height="24"
            :is="mood[averageMoodFiveDays]?.imageWhite || ''"
          ></component
          >{{ mood[averageMoodFiveDays].text }}
        </div>
        <template #trDescription>
          <div v-if="averageMoodFiveDays?.length" class="trackFlex second">
            <component :is="trend[compareMoodStatistic!].ico" />{{
              trend[compareMoodStatistic!].text
            }}
          </div></template
        >
      </TrackingBlock>
    </div>
    <div class="statisticSleepBlock">
      <h2 class="statisticSleepBlock__title text-preset-5">
        Average Sleep <el-text class="text-preset-7">(Last 5 Check-ins)</el-text>
      </h2>
      <TrackingBlock>
        <div class="trackSleep" v-if="averageSleepFiveDays?.length">
          <SleepIco width="24" height="24" />
          {{ sleep[averageSleepFiveDays as keyof typeof sleep].text }}
        </div>
        <span v-else>Not enough data yet!</span>
        <template #trDescription
          ><div v-if="averageSleepFiveDays?.length" class="trackSleep second">
            <component :is="trend[compareSleepStatistic!].ico" />{{
              trend[compareSleepStatistic!].text
            }}
          </div>
          <span v-else>Track 5 nights to view average sleep.</span></template
        >
      </TrackingBlock>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { useGlobalProfileState } from "~/composables/globalProfileState";
import { MoodForm } from "~/composables/globalMoodState";
import { getMediane } from "./helpers";
import { mood, sleep, trend } from "./staticDataForStatistic";
import { SleepIco } from "~/assets/iconImport";

const state = useGlobalProfileState();

const getStatisticKey = (current: string | null, prev: string | null) => {
  if (!current || !prev) return null;
  if (+current > +prev) return "increase";
  else if (+current < +prev) return "decrease";
  return "same";
};

const tenItemsSlice = computed(() => {
  const arrFromLogData = Object.keys(state.value.logData);

  if (arrFromLogData.length >= 5) {
    return Object.keys(state.value.logData)
      .toSorted((a, b) => new Date(b).getTime() - new Date(a).getTime())
      .slice(0, 10)
      .map((e) => (state.value.logData as Record<string, MoodForm>)[e]);
  }
  return [];
});

const averageMoodFiveDays = computed(() => {
  const data = tenItemsSlice.value;
  return data.length ? getMediane(data.slice(0, 5), "mood") : null;
});

const averageMoodPreviousFiveDays = computed(() => {
  const data = tenItemsSlice.value;
  return data.length ? getMediane(data.slice(-5), "mood") : null;
});

const averageSleepFiveDays = computed(() => {
  const data = tenItemsSlice.value;
  return data.length ? getMediane(data.slice(0, 5), "sleepHours") : null;
});

const averageSleepPreviousFiveDays = computed(() => {
  const data = tenItemsSlice.value;
  return data.length ? getMediane(data.slice(-5), "sleepHours") : null;
});

const compareMoodStatistic = computed(() =>
  getStatisticKey(averageMoodFiveDays.value, averageMoodPreviousFiveDays.value),
);

const compareSleepStatistic = computed(() =>
  getStatisticKey(averageSleepFiveDays.value, averageSleepPreviousFiveDays.value),
);

const currentColor = computed(() =>
  averageMoodFiveDays.value !== null && mood[averageMoodFiveDays.value]
    ? mood[averageMoodFiveDays.value].bgVar || "var(--blue-100)"
    : "var(--blue-100)",
);
</script>

<style lang="scss" scoped>
.statisticMoodBlock {
  margin-bottom: 24px;
}

h2 {
  color: var(--neutral-900);
  margin-bottom: 12px;
}

.el-text {
  --el-text-color-regular: var(--neutral-600);
}

.trackFlex {
  display: flex;
  gap: 16px;
  align-items: center;
}

.trackFlex.second {
  gap: 8px;
}

.trackSleep {
  --neutral-600: color-mix(in srgb, var(--neutral-0) 70%, transparent);
}

.trackSleep.second {
  display: flex;
  align-items: flex-start;
  gap: 8px;

  svg {
    filter: brightness(10);
  }
}
</style>
