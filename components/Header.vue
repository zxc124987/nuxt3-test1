<template>
  <div style="display: flex; width: 100%">
    <el-button type="primary" link :icon="Menu" @click="toggleMenuHandler" />
    <el-popconfirm
      title="確定要登出嗎？"
      width="250"
      confirm-button-text="確定"
      cancel-button-text="取消"
      @confirm="logoutHandler"
    >
      <template #reference>
        <el-button class="logout">登出</el-button>
      </template>
    </el-popconfirm>
  </div>
</template>

<script lang="ts" setup>
import { Menu } from "@element-plus/icons-vue";
import type { ApiResponse } from "~/types/apiResponse";

const isLogin = useCookie<Boolean>("isLogin");
const { loading } = useCommon();

const emits = defineEmits<{
  (e: "menuHandleSwitch"): void;
}>();

function toggleMenuHandler() {
  emits("menuHandleSwitch");
}

async function logoutHandler() {
  const { data: res } = await useFetch<ApiResponse>("/api/logout", {
    onRequest({ request, options }) {
      loading.value = true;
    },
    onResponse({ request, response, options }) {
      loading.value = false;
      return response._data;
    },
  });
  if (res?.value?.success) {
    navigateTo("/login");
    isLogin.value = false;
  }
}
</script>

<style lang="scss" scoped></style>
