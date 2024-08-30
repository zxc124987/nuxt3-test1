<template>
  <div style="display: flex;width: 100%;">
    <el-button type="primary" link :icon="Menu" @click="toggleMenuHandler" />
    <el-popconfirm
      title="確定要登出嗎？"
      width="250"
      confirm-button-text="確定"
      cancel-button-text="取消"
      @confirm="logout"
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

const router = useRouter();

const menuSwitch = ref<boolean>(false);

function toggleMenuHandler() {
  menuSwitch.value = !menuSwitch.value;
}

async function logout() {
  const { data } = await useHttp(`acct/logout`);
  if (!data.value.success) return;
  router.replace({ name: "index" });
}
</script>

<style lang="scss" scoped>
</style>