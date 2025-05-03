<template>
  <AuthForm next-link="/auth/SignUp">
    <template #formTitle>Welcome back!</template>
    <template #formDescription> Log in to continue tracking your mood and sleep.</template>
    <template #btnContent>Log In</template>
    <template #formQuestion>Haven't got an account?</template>
    <template #authTextLink>Sign Up.</template>
  </AuthForm>
</template>

<script setup lang="ts">
import AuthForm from "~/components/shared/AuthForm.vue";
</script>
