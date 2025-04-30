<template>
  <el-container class="baseAuthContainer">
    <slot></slot>
  </el-container>
</template>
<style lang="scss" scoped>
.baseAuthContainer {
  display: block;
  margin: 0 auto;
  padding: 10px 16px;
  height: inherit;

  @include mq(small) {
    max-width: 480px;
  }
  @include mq(medium) {
    max-width: 530px;
  }
  @include mq(large) {
    max-width: 530px;
  }
}
</style>
