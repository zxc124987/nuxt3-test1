<script lang="ts" setup>
import { Document, HomeFilled, FolderOpened } from "@element-plus/icons-vue";
import type { SidebarMenu } from "~/types/sidebarMenu";

const props = defineProps<{
  menuSwitch: boolean;
  sidebarMenu: SidebarMenu[];
}>();

onMounted(() => {});
</script>

<template>
  <div>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      :collapse="props.menuSwitch"
    >
      <el-menu-item index="0">
        <el-icon><HomeFilled /></el-icon>
        <template #title>
          <NuxtLink to="/">首頁</NuxtLink>
        </template>
      </el-menu-item>
      <template v-for="(menu1, index1) in props.sidebarMenu">
        <el-sub-menu
          v-if="menu1.children_items.length"
          :key="menu1.mi_sid"
          :index="`${index1 + 1}`"
        >
          <template #title>
            <el-icon><FolderOpened /></el-icon>
            <span>{{ menu1.mi_name }}</span>
          </template>
          <el-menu-item
            v-for="(menu2, index2) in menu1.children_items"
            :key="menu2.mi_sid"
            :index="`${index1 + 1}-${index2 + 1}`"
          >
            <el-icon><Document /></el-icon>
            <span>
              <NuxtLink :to="menu2.mi_path">{{ menu2.mi_name }}</NuxtLink>
            </span>
          </el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<style scoped lang="sass">
.el-aside
  > div
    height: 100%

    .el-menu
      height: 100%
</style>
