<template>
  <el-dialog v-model="centerDialogVisible">
    <div class="moodLogModal">
      <div class="moodLogModal__header">
        <h2 class="moodLogModal__title text-preset-5">Log your mood</h2>
        <ul class="stepsList">
          <li
            v-for="n of 4"
            :key="'step' + n"
            class="stepsList__item"
            :class="n <= step && 'passed'"
          ></li>
        </ul>
      </div>
      <div class="moodLogModal__content"></div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const centerDialogVisible = defineModel<boolean>("centerDialogVisible");

const step = ref(1);
</script>
<style lang="scss scoped"></style>
