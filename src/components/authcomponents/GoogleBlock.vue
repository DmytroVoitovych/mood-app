<template>
  <el-button size="large" @click="loginUserByGoogle" :loading="loading">
    Google<GoogleIco
  /></el-button>
</template>

<script setup lang="ts">
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { GoogleIco } from "~/assets/iconImport";
import { googleAuthErrorHandler } from "./helpers";
import { useGlobalLoadingState } from "~/composables/globalLoadingState";

const { loading } = useGlobalLoadingState();

const loginUserByGoogle = () => {
  loading.value = true;
  const provider = new GoogleAuthProvider();

  signInWithPopup(getAuth(), provider)
    .catch((error) => {
      loading.value = false;
      googleAuthErrorHandler(error.code);
    })
    .finally(() => (loading.value = false));
};
</script>
