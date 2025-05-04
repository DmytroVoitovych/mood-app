<template>
  <div class="inputBlock">
    <el-form-item
      prop="email"
      label="Email address"
      class="text-preset-6-regular"
      :rules="formEmailRules"
    >
      <el-input
        placeholder="name@mail.com"
        size="small"
        v-model="email"
        required
        autocomplete="on"
      />
    </el-form-item>
    <el-form-item
      label="Password"
      prop="pass"
      class="text-preset-6-regular"
      size="large"
      :rules="formPasswordRules"
    >
      <el-input
        v-model="pass"
        type="password"
        autocomplete="off"
        size="small"
        show-password
        required
      />
    </el-form-item>
  </div>
</template>

<script lang="ts" setup>
import { formEmailRules, formPasswordRules } from "./helpers";

const email = defineModel<string>("email");
const pass = defineModel<string>("pass");
</script>

<style lang="scss" scoped>
.el-form-item.is-error :deep(.el-input__wrapper.is-focus) {
  outline: 2px solid var(--el-color-danger);
  box-shadow: 0 0 0 1px var(--el-color-danger) inset;
  outline-offset: 3px;
}

.el-form-item {
  --el-text-color-regular: var(--neutral-900);
  --el-form-label-font-size: 18px;

  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }

  :deep(.el-form-item__error) {
    display: flex;
    align-items: center;
    gap: 6px;

    &:before {
      content: "";
      display: inline-block;
      width: 12px;
      height: 12px;
      background-repeat: no-repeat;
      background-size: contain;
      background-image: url("~/assets/images/info-circle.svg");
    }
  }
}

.el-input {
  font-size: 18px;

  :deep(.el-input__wrapper) {
    padding: 12px 16px;

    &.is-focus {
      box-shadow: 0 0 0 1px var(--neutral-300) inset;
      outline: 2px solid var(--blue-600);
      outline-offset: 3px;
    }
  }

  :deep(.el-input__wrapper:not(.is-focus)) {
    @media (hover: hover) {
      &:hover {
        cursor: pointer;
      }
    }
  }

  :deep(.el-input__inner:not(:focus)) {
    @media (hover: hover) {
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
