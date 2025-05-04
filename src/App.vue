<template>
  <RouterView />
</template>

<script lang="ts" setup>
import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";
import { onMounted } from "vue";
// import { useRouter } from "vue-router";

let auth: Auth;
// const router = useRouter();

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    console.log(user, "state was changed");
    // if (user) router.push({ name: "/" });
  });
});
</script>
<style></style>
