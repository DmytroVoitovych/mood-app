<template>
  <div class="profileBlock">
    <el-avatar :size="40" :src="state.avatar" />
    <el-popover
      trigger="click"
      :show-arrow="false"
      :title="state.profileName"
      :width="popoverWidth"
      :teleported="false"
      placement="bottom-end"
      popper-style="inset:calc(100% + 16px) 0px auto auto;"
    >
      <template #reference
        ><div><ArrowIco /></div
      ></template>
      <div class="contentBlock text-preset-7">
        <span class="email">{{ state.email }}</span>
        <el-divider></el-divider>
        <div class="actionBlock">
          <el-button class="text-preset-7" text @click="$emit('showModal')"
            ><template #icon><SettingIco /></template>Settings</el-button
          >
          <el-button class="text-preset-7" text @click.once="logOut"
            ><template #icon><LogoutIco /></template>Logout</el-button
          >
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script lang="ts" setup>
import { useMediaQuery } from "@vueuse/core";
import { getAuth, signOut } from "firebase/auth";
import { computed } from "vue";
import { ArrowIco, LogoutIco, SettingIco } from "~/assets/iconImport";
import { useGlobalProfileState } from "~/composables/globalProfileState";

const isMediumScreen = useMediaQuery("(min-width: 530px)");
const state = useGlobalProfileState();

const popoverWidth = computed(() => (isMediumScreen.value ? "200px" : "100%"));

const logOut = () => signOut(getAuth()).catch((e) => console.log(e));
</script>

<style lang="scss" scoped>
.profileBlock {
  display: inline-flex;
  align-items: center;
  gap: 10px;

  .el-avatar {
    --el-avatar-bg-color: transparent;
  }

  :deep(.el-popper) {
    --el-box-shadow-light: var(--popover-shadow);
  }

  .email {
    color: var(--neutral-300);
  }

  .el-tooltip__trigger {
    @media (hover: hover) {
      &:hover {
        cursor: pointer;
      }
    }
  }

  .el-divider {
    --el-border-color: var(--blue-100);

    margin: 12px 0;
  }

  .actionBlock {
    display: grid;
    gap: 12px;
    place-items: start;
  }

  .el-button {
    --el-button-text-color: var(--neutral-900);
    --el-button-border-color: transparent;
    --el-button-bg-color: transparent;
    --el-button-hover-bg-color: transparent;
    --el-button-active-bg-color: transparent;

    padding: 0;
    margin: 0;
    height: auto;

    & :deep([class*="el-icon"] + span) {
      margin-left: 10px;
    }

    :deep(.el-icon) {
      width: 16px;
      height: 16px;

      & > svg {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
