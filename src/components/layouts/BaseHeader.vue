<template>
  <header>
    <MainLogo />
    <ProfilePopover @show-modal="centerDialogVisible = !centerDialogVisible" />
    <el-dialog v-model="centerDialogVisible" align-center>
      <AuthForm setting-flag @auth-form-emit="updateUserProfile($event).then(getUpdateInfo)">
        <template #formTitle>Update your profile</template>
        <template #formDescription>Personalize your account with your name and photo.</template>
        <template #btnContent>Save changes</template>
      </AuthForm></el-dialog
    >
  </header>
</template>

<script lang="ts" setup>
import { updateUserProfile } from "~/composables/updateUserProfile";
import ProfilePopover from "../ProfilePopover.vue";
import { ref } from "vue";
import { ElMessage } from "element-plus";

const centerDialogVisible = ref(false);

const getUpdateInfo = (newData: boolean | void) => {
  if (newData) {
    centerDialogVisible.value = false;
    ElMessage({
      message: "Your profile was updated successfully!",
      type: "success",
      plain: true,
    });
    return;
  }
  ElMessage({
    message: "Data was not changed!Put new data to update your profile.",
    type: "info",
    plain: true,
  });

  return;
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  :deep(.el-dialog) {
    --el-dialog-border-radius: 16px;
    --el-dialog-padding-primary: 40px 20px;
    --el-dialog-width: calc(100% - 32px);

    max-width: 600px;

    @include mq(medium) {
      --el-dialog-padding-primary: 48px 40px;
    }

    .el-icon.el-dialog__close {
      --el-color-info: var(--neutral-300);
    }
  }
}
</style>
