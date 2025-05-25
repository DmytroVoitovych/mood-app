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
import { useRoute, useRouter } from "vue-router";
import { useGlobalProfileState } from "~/composables/globalProfileState";
import { watch } from "vue";

const router = useRouter();
const route = useRoute();
const state = useGlobalProfileState();

watch(
  () => state.value.isAboard,
  (n) => {
    if (n && route.name === "/auth/OnBoarding") {
      router.push({ name: "/" });
    }
  },
);
</script>
