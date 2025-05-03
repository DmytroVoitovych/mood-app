<template>
  <AuthForm>
    <template #formTitle>Personalize your experience</template>
    <template #formDescription>Add your name and a profile picture to make Mood yours.</template>
    <template #btnContent>Start Tracking</template>
  </AuthForm>
</template>

<script setup lang="ts">
import AuthForm from "~/components/shared/AuthForm.vue";
</script>
