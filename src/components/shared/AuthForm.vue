<template>
  <ContainerBase>
    <div class="authBlock">
      <MainLogo />
      <el-form :model="ruleForm" label-position="top" label-width="100%" hide-required-asterisk>
        <div class="formTextBlock">
          <h1 class="text-preset-3 authTitle"><slot name="formTitle"> Create an account </slot></h1>
          <el-text class="text-preset-6-regular" size="large">
            <slot name="formDescription">Join to track your daily mood and sleep with ease.</slot>
          </el-text>
        </div>
        <div class="inputBlock">
          <el-form-item
            prop="email"
            label="Email address"
            :rules="[
              {
                required: true,
                message: 'Please input email address',
                trigger: 'blur',
              },
              {
                type: 'email',
                message: 'Please input correct email address',
                trigger: ['blur', 'change'],
              },
            ]"
          >
            <el-input placeholder="name@mail.com" />
          </el-form-item>
          <el-form-item label="Password" prop="pass">
            <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
          </el-form-item>
        </div>
        <el-button type="primary"><slot name="btnContent">Sign Up</slot></el-button>
        <el-text class="text-preset-6-regular" size="large">
          <slot name="formQuestion">Already got an account?</slot>
        </el-text>
      </el-form>
    </div>
  </ContainerBase>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import MainLogo from "./MainLogo.vue";

const ruleForm = reactive({
  pass: "",
  email: "",
});
</script>

<style lang="scss" scoped>
.authBlock {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
  height: inherit;

  .authTitle {
    color: var(--neutral-900);
  }
}

.el-form {
  --el-color-primary: var(--blue-600);
  --el-text-color-regular: var(--neutral-600);
  --el-font-size-medium: 18px;

  display: grid;
  padding: 40px 16px;

  & > *:not(.el-button) {
    margin-bottom: 32px;
  }
}
</style>
