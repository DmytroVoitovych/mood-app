<template>
  <el-popover
    ref="target"
    class="box-item"
    content="Left Top prompts info"
    placement="left-start"
    v-bind="isMounted ? { appendTo: '.segementsBlock' } : {}"
    popper-class="barPopover"
    :popper-style="{ 'max-width': '175px' }"
    width="100%"
    :trigger="isHoverSupported ? 'hover' : 'click'"
  >
    <template #reference>
      <slot></slot>
    </template>
    <slot name="popoverContent"></slot>
  </el-popover>
</template>

<script lang="ts" setup>
import { useMediaQuery } from "@vueuse/core";
import { onMounted, ref } from "vue";

const isMounted = ref(false);
const isHoverSupported = useMediaQuery("(hover: hover)");
onMounted(() => (isMounted.value = true));
</script>

<style lang="scss" scoped></style>
