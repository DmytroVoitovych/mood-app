import { useAuth } from "@vueuse/firebase";
import { UploadUserFile } from "element-plus";
import { getAuth, updateProfile } from "firebase/auth";
import { computed } from "vue";
import { Router } from "vue-router";
import { AvatarPlaceholder } from "~/assets/iconImport";
import { getUserAvaterUrl } from "~/composables/globalAvatarUploader";
import { useGlobalLoadingState } from "~/composables/globalLoadingState";
import { useGlobalProfileState } from "~/composables/globalProfileState";

type OnboardingData = {
  name: string;
  fileList: UploadUserFile[];
};

export const updateUserProfile = async (
  { name, fileList }: OnboardingData,
  router?: Router,
): Promise<void | boolean> => {
  const state = useGlobalProfileState();
  const { loading } = useGlobalLoadingState();

  const auth = getAuth();
  const { user } = useAuth(auth);

  if (user.value?.displayName === name && !fileList.length) return;

  loading.value = true;
  const avatarUrl = await getUserAvaterUrl({ name, fileList });

  const setFirstUserState = () => {
    state.value.profileName = name;
    state.value.avatar = avatarUrl || AvatarPlaceholder;
    state.value.isAboard = true;
    state.value.email = user.value?.email || "no email";
  };

  const updateUserState = () => {
    state.value.profileName = name;
    state.value.avatar = avatarUrl || state.value.avatar;
    return true;
  };

  const getCorrectAction = computed(() =>
    state.value.isAboard ? updateUserState : setFirstUserState,
  );

  return updateProfile(user.value!, {
    displayName: name,
    photoURL: avatarUrl || AvatarPlaceholder,
  })
    .then(getCorrectAction.value)
    .catch((error) => {
      loading.value = false;
      console.log(error);
    })
    .finally(() => {
      if (router) router.push({ name: "/" });
      loading.value = false;
    });
};
