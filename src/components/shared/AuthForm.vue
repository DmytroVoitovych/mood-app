<template>
  <div class="authBlock">
    <MainLogo v-if="!settingFlag" />
    <el-form
      :model="currentForm"
      label-position="top"
      label-width="100%"
      hide-required-asterisk
      class="auth onboarding"
      :class="settingFlag ? 'setting' : ''"
      ref="formRef"
    >
      <div class="formTextBlock">
        <h1 class="text-preset-3 authTitle"><slot name="formTitle"> Create an account </slot></h1>
        <el-text class="text-preset-6-regular" size="large">
          <slot name="formDescription">Join to track your daily mood and sleep with ease.</slot>
        </el-text>
      </div>
      <InputAuthBlock v-if="nextLink" v-model:pass="authForm.pass" v-model:email="authForm.email" />
      <UploadComponent
        v-else
        v-model:name="uploadForm.name"
        v-model:fileList="uploadForm.fileList"
      />
      <el-button
        type="primary"
        size="large"
        class="text-preset-5"
        @click="$emit('authFormEmit', currentForm)"
        :loading="loading"
        :disabled="loading"
        ><slot name="btnContent">Sign Up</slot></el-button
      >
      <div class="authPageSwitch" v-if="nextLink">
        <el-text class="text-preset-6-regular" size="large">
          <slot name="formQuestion">Already got an account?</slot
          ><router-link :to="nextLink || '/auth/SignIn'" class="switchLink"
            >&nbsp;<slot name="authTextLink">Log in.</slot></router-link
          >
        </el-text>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import MainLogo from "./MainLogo.vue";
import InputAuthBlock from "../authcomponents/InputAuthBlock.vue";
import UploadComponent from "../authcomponents/UploadComponent.vue";
import { FormInstance, UploadUserFile } from "element-plus";
import { useGlobalLoadingState } from "~/composables/globalLoadingState";
import { useGlobalProfileState } from "~/composables/globalProfileState";

const props = defineProps<{ nextLink?: "/auth/SignIn" | "/auth/SignUp"; settingFlag?: boolean }>();

const state = useGlobalProfileState();

const formRef = ref<FormInstance>();
const { loading } = useGlobalLoadingState();

const authForm = reactive({
  pass: "",
  email: "",
});

const uploadForm = reactive<{ name: string; fileList: UploadUserFile[] }>({
  name: state.value.profileName,
  fileList: [],
});

const currentForm = computed(() => (props.nextLink ? authForm : uploadForm));
</script>

<style lang="scss" scoped>
.authBlock {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 32px;
  height: inherit;

  .authTitle {
    color: var(--neutral-900);
    margin-bottom: 8px;
  }
}

.el-form {
  --el-color-primary: var(--blue-600);
  --el-text-color-regular: var(--neutral-600);
  --el-font-size-medium: 18px;
  --el-component-size-small: 27px;
  --el-border-radius-base: 10px;
  --el-border-color: var(--neutral-300);
  --el-text-color-placeholder: var(--neutral-600);
  --el-color-danger: var(--red-700);

  display: grid;
  padding: 40px 16px;

  @include mq(medium) {
    padding: 40px 32px;
  }

  & > *:not(:where(.el-button, :last-child)) {
    margin-bottom: 32px;
  }

  &.setting > *:not(:where(.el-button, :last-child)) {
    margin-bottom: 24px;

    @include mq(medium) {
      margin-bottom: 32px;
    }
  }

  &.setting {
    .el-button {
      --el-button-size: 60px;
      margin-bottom: 0;
    }
  }

  .el-button {
    margin-bottom: 20px;
  }

  .authPageSwitch {
    text-align: center;
  }

  .switchLink {
    color: var(--el-color-primary);
  }
}

.el-form.setting {
  padding: 0;
  box-shadow: none;

  @include mq(medium) {
    padding: 0;
  }
}
</style>
