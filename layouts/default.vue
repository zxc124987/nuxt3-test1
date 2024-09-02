<template>
  <div class="common-layout">
    <el-container v-loading.fullscreen.lock="loading">
      <el-header>
        <Header @menuHandleSwitch="menutoggleHandler"></Header>
      </el-header>
      <el-container>
        <el-aside>
          <SidebarMenu :menuSwitch="menuSwitch" :sidebarMenu="sidebarMenu" />
        </el-aside>
        <el-container>
          <el-main>
            <div class="main" style="padding: 15px">
              <slot />
            </div>
          </el-main>
          <el-footer><Footer></Footer></el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { useApp } from "@/composables/useApp";

const { loading, sidebarMenu } = useApp();

const menuSwitch = ref(false);

function menutoggleHandler(val) {
  menuSwitch.value = !menuSwitch.value;
}

onMounted(() => {});
</script>

<style lang="sass" scoped>
.common-layout
  .el-container
    .el-header
      color: #cdcdcd

    .el-container
      height: calc(100vh - 55px)
</style>