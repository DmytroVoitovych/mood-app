<template>
  <ContainerBase>
    <AuthForm @auth-form-emit="updateUserProfile($event, router)">
      <template #formTitle>Personalize your experience</template>
      <template #formDescription>Add your name and a profile picture to make Mood yours.</template>
      <template #btnContent>Start Tracking</template>
    </AuthForm>
  </ContainerBase>
</template>

<script setup lang="ts">
import AuthForm from "~/components/shared/AuthForm.vue";
import { updateUserProfile } from "~/composables/updateUserProfile";
import { useRouter } from "vue-router";

const router = useRouter();
</script>
