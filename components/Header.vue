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
import { useHttp } from "#imports";
import { loginService } from "../server/api/login";

const router = useRouter();

const emits = defineEmits<{
  (e: "menuHandleSwitch"): void;
}>();

function toggleMenuHandler() {
  emits("menuHandleSwitch");
}

async function logoutHandler() {
  const { data } = await loginService().logout();
  if (data.value.success) {
    ElMessage({
      message: data.value.message,
      type: data.value.success ? "success" : "error",
    });
    router.replace({ name: "index" });
  }
}
</script>

<style lang="scss" scoped>
</style>