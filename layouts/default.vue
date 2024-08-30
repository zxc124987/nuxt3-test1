<template>
  <div class="common-layout">
    <el-container v-loading.fullscreen.lock="loading">
      <el-header v-if="displayHeader">
        <el-button
          type="primary"
          link
          :icon="Menu"
          @click="toggleMenuHandler"
        />
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
      </el-header>
      <el-container>
        <el-aside v-if="displaySidebar">
          <SidebarMenu :menuSwitch="menuSwitch" :sidebarMenu="sidebarMenu" />
        </el-aside>
        <el-container>
          <el-main>
            <div
              class="main"
              :style="{ padding: displaySidebar ? '15px' : '0px' }"
            >
              <NuxtPage />
            </div>
          </el-main>
          <el-footer v-if="displayFooter"
            >© {{ year }} Power By Hank.</el-footer
          >
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { Menu } from "@element-plus/icons-vue";
import { useApp } from "@/composables/useApp";
import { useHttp } from "#imports";

const { loading, sidebarMenu } = useApp();
const route = useRoute();
const router = useRouter();

const displayHeader = ref(false);
const displaySidebar = ref(false);
const displayFooter = ref(false);
const year = new Date().getFullYear();
const menuSwitch = ref(false);

function toggleMenuHandler() {
  menuSwitch.value = !menuSwitch.value;
}

async function logout() {
  const { data } = await useHttp(`acct/logout`);
  if (!data.value.success) return;
  router.replace({ name: "index" });
}

watch(
  () => route.name,
  () => {
    const routerName = route.name;
    if (routerName === "index") {
      displayHeader.value = false;
      displaySidebar.value = false;
      displayFooter.value = false;
    } else {
      displayHeader.value = true;
      displaySidebar.value = true;
      displayFooter.value = true;
    }
  },
  { immediate: true, deep: true }
);

onMounted(() => {});
</script>

<style lang="sass" scoped>
.common-layout
  .el-container
    .el-header
      background-color: #575757
      color: #cdcdcd

    .el-container
      height: calc(100vh - 55px)
</style>