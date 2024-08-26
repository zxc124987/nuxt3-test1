<script setup lang="ts">
import { Menu } from "@element-plus/icons-vue";
const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;
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
  const { data } = await useFetch(`${apiUrl}acct/logout`);
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


<template>
  <div class="common-layout">
    <el-container>
      <el-header v-if="displayHeader">
        <el-button
          type="primary"
          link
          :icon="Menu"
          @click="toggleMenuHandler"
        />
        <el-button class="logout" @click="logout">登出</el-button>
      </el-header>
      <el-container>
        <el-aside v-if="displaySidebar">
          <SidebarMenu :menuSwitch="menuSwitch" />
        </el-aside>
        <el-container>
          <el-main>
            <NuxtPage />
          </el-main>
          <el-footer v-if="displayFooter"
            >© {{ year }} Power By Hank.</el-footer
          >
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="sass" scoped>
.common-layout
  .el-container
    .el-header
      background-color: #575757
      color: #cdcdcd

    .el-container
      height: calc(100vh - 60px)
</style>
