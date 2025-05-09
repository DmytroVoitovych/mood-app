<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <el-container direction="vertical">
    <BaseHeader />
    <main>
      <section class="hero">
        <GreetingsBlock />
      </section>
      <section class="statistic"></section>
      <section class="diagram"></section>
    </main>
  </el-container>
</template>

<script lang="ts" setup></script>
<style lang="scss" scoped>
.el-container {
  display: block;
  margin: 0 auto;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 32px;
  padding-bottom: 80px;
  height: 100%;

  @include mq(small) {
    max-width: 480px;
  }
  @include mq(medium) {
    max-width: 100%;
    padding-top: 40px;
    padding-left: 32px;
    padding-right: 32px;
  }
  @include mq(large) {
    max-width: 1200px;
    padding-left: 15px;
    padding-right: 15px;
  }
}

section:not(.hero) {
  padding: 20px 16px;
}
</style>
