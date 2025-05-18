<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <el-container direction="vertical">
    <BaseHeader />
    <main>
      <section class="hero">
        <GreetingsBlock />
      </section>
      <div class="sectionWrapper">
        <section class="statistic">
          <StatisticBlock />
        </section>
        <section class="diagram">
          <DiagramBlock />
        </section>
      </div>
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

.hero {
  margin-bottom: 48px;

  @include mq(large) {
    margin-bottom: 64px;
  }
}

.hero:has(section) {
  margin-bottom: 32px;
}

.sectionWrapper {
  display: flex;
  flex-direction: column;
  gap: 32px;

  @include mq(large) {
    flex-direction: row;
  }
}
.statistic {
  flex-shrink: 0;
}

:where(.statistic, .diagram) {
  border-radius: 16px;
  border: 1px solid var(--blue-100);
  background-color: var(--neutral-0);
}

.diagram {
  flex-grow: 1;
}

section:not(:where(.hero, .el-container)) {
  padding: 20px 16px;
}
</style>
