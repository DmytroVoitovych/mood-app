<template>
  <ContainerBase>
    <AuthForm next-link="/auth/SignIn" @auth-form-emit="registerUser"
  /></ContainerBase>
</template>

<script setup lang="ts">
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import AuthForm from "~/components/shared/AuthForm.vue";
import { profileCheckAndUpdate, registrationErrorHandler } from "./helpers";
import { useGlobalLoadingState } from "~/composables/globalLoadingState";
import { useAuth } from "@vueuse/firebase";
import { useRouter } from "vue-router";

const router = useRouter();
const { loading } = useGlobalLoadingState();
const auth = getAuth();
const { user } = useAuth(auth);

const registerUser = ({ email, pass }: { email: string; pass: string }) => {
  loading.value = true;

  createUserWithEmailAndPassword(auth, email.trim(), pass)
    .then((data) => profileCheckAndUpdate(data, false))
    .catch((error) => registrationErrorHandler(error.code))
    .finally(() => {
      loading.value = false;
      if (user.value) router.push({ name: "/auth/OnBoarding" });
    });
};
</script>
