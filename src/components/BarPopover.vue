<template>
  <el-popover
    ref="target"
    class="box-item"
    content="Left Top prompts info"
    placement="left-start"
    v-bind="isMounted ? { appendTo: '.segementsBlock' } : {}"
  >
    <template #reference>
      <slot></slot>
    </template>
  </el-popover>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

const isMounted = ref(false);

onMounted(() => (isMounted.value = true));
</script>
