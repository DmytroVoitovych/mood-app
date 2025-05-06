<template>
  <div class="inputBlock">
    <el-form-item label="Name" prop="name">
      <el-input v-model="name" placeholder="Jane Appleseed" />
    </el-form-item>
    <div class="uploadBlock">
      <el-avatar :size="64" :src="imageUrl ? imageUrl : AvatarPlaceholder" />
      <el-upload
        ref="upload"
        v-model:file-list="fileList"
        list-type="picture"
        :auto-upload="false"
        :limit="1"
        :show-file-list="false"
        :on-change="handleAvatarChange"
        :on-exceed="handleExceed"
        accept="image/png,image/jpeg,image/jpg"
        class="uploadWrapper"
      >
        <el-text class="text-preset-6-regular">Upload Image</el-text>
        <template #tip>
          <div class="el-upload__tip text-preset-7">Max 250KB, PNG or JPEG</div>
        </template>
        <template #trigger><el-button class="text-preset-6">Upload</el-button></template>
        <span v-show="errMessage" class="is-error text-preset-9"
          ><LogoCircle width="12" height="12" />{{ errMessage }}</span
        >
      </el-upload>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  genFileId,
  UploadInstance,
  UploadProps,
  UploadRawFile,
  UploadUserFile,
} from "element-plus";
import { ref } from "vue";
import { AvatarPlaceholder, LogoCircle } from "~/assets/iconImport";

const SIZE_ERR_MESSAGE = "Avatar picture size can not exceed 250kb!";
const FORMAT_ERR_MESSAGE = "Avatar picture must be JPG or PNG format!";

const name = defineModel<string>("name");
const fileList = defineModel<UploadUserFile[]>("fileList");
const imageUrl = ref("");
const errMessage = ref("");

const upload = ref<UploadInstance>();

const handleExceed: UploadProps["onExceed"] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  const isAcceptableFormats = ["image/jpg", "image/jpeg", "image/png"].includes(rawFile.type);

  if (!isAcceptableFormats) {
    errMessage.value = FORMAT_ERR_MESSAGE;
    return false;
  } else if (rawFile.size / 1024 > 250) {
    errMessage.value = SIZE_ERR_MESSAGE;
    return false;
  }
  errMessage.value = "";
  return true;
};

const handleAvatarChange: UploadProps["onChange"] = (uploadFile) => {
  if (!beforeAvatarUpload(uploadFile.raw!)) return;
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
};
</script>

<style lang="scss" scoped>
.inputBlock {
  position: relative;
}

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

.uploadBlock {
  display: flex;
  gap: 20px;
}

.uploadWrapper {
  .el-text {
    --el-text-color-regular: var(--neutral-900);
  }
  .el-button {
    --el-text-color-regular: var(--neutral-900);
    --el-border-radius-base: 8px;
  }

  display: grid;
  place-items: start;
  grid-template-rows: repeat(3, 0fr) 0;

  .is-error {
    position: absolute;
    top: calc(100% + 8px);
    color: var(--el-color-danger);
    display: flex;
    gap: 6px;

    svg {
      flex-shrink: 0;
    }
  }

  .el-upload__tip {
    margin-top: 6px;
    margin-bottom: 20px;
  }

  :deep(.el-upload--picture) {
    grid-row: 3/4;
  }
}
</style>
