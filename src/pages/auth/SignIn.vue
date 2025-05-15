<template>
  <ContainerBase>
    <AuthForm next-link="/auth/SignUp" @auth-form-emit="loginUser">
      <template #formTitle>Welcome back!</template>
      <template #formDescription> Log in to continue tracking your mood and sleep.</template>
      <template #btnContent>Log In</template>
      <template #formQuestion>Haven't got an account?</template>
      <template #authTextLink>Sign Up.</template>
    </AuthForm>
  </ContainerBase>
</template>

<script setup lang="ts">
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import AuthForm from "~/components/shared/AuthForm.vue";
import { useGlobalLoadingState } from "~/composables/globalLoadingState";
import { authErrorHandler, profileCheckAndUpdate } from "./helpers";

const { loading } = useGlobalLoadingState();

const loginUser = ({ email, pass }: { pass: string; email: string }) => {
  loading.value = true;
  signInWithEmailAndPassword(getAuth(), email.trim(), pass)
    .then((data) => profileCheckAndUpdate(data, true))
    .catch((error) => authErrorHandler(error.code))
    .finally(() => (loading.value = false));
};
</script>
