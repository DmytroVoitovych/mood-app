<template>
  <AuthForm @auth-form-emit="onBoardUser">
    <template #formTitle>Personalize your experience</template>
    <template #formDescription>Add your name and a profile picture to make Mood yours.</template>
    <template #btnContent>Start Tracking</template>
  </AuthForm>
</template>

<script setup lang="ts">
import { useAuth } from "@vueuse/firebase";
import { UploadUserFile } from "element-plus";
import { getAuth, updateProfile } from "firebase/auth";
import { useRouter } from "vue-router";
import { AvatarPlaceholder } from "~/assets/iconImport";
import AuthForm from "~/components/shared/AuthForm.vue";
import { getUserAvaterUrl } from "~/composables/globalAvatarUploader";
import { useGlobalLoadingState } from "~/composables/globalLoadingState";
import { useGlobalProfileState } from "~/composables/globalProfileState";

type OnboardingData = {
  name: string;
  fileList: UploadUserFile[];
};
const router = useRouter();

const state = useGlobalProfileState();
const { loading } = useGlobalLoadingState();

const auth = getAuth();
const { user } = useAuth(auth);

const onBoardUser = async ({ name, fileList }: OnboardingData) => {
  loading.value = true;
  const avatarUrl = await getUserAvaterUrl({ name, fileList });

  updateProfile(user.value!, {
    displayName: name,
    photoURL: avatarUrl || AvatarPlaceholder,
  })
    .then(() => {
      state.value.profileName = name;
      state.value.avatar = avatarUrl || AvatarPlaceholder;
      state.value.isAboard = true;
    })
    .catch((error) => console.log(error))
    .finally(() => {
      loading.value = false;
      router.push({ name: "/" });
    });
};
</script>
