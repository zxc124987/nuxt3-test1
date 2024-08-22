<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  ChatRound,
  Location,
  Setting,
  Connection,
} from "@element-plus/icons-vue";

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<template>
  <div>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Page</span>
        </template>
        <el-sub-menu index="1-1">
          <template #title>Page</template>
          <el-menu-item index="1-1-1">
            <NuxtLink to="/page/page-1">page 1</NuxtLink>
          </el-menu-item>
          <el-menu-item index="1-1-2">
            <NuxtLink to="/page/page-2">page 2</NuxtLink>
          </el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <span>
          <NuxtLink to="/user">/user/index</NuxtLink>
        </span>
      </el-menu-item>
      <el-menu-item index="3">
        <el-icon><ChatRound /></el-icon>
        <span>
          <NuxtLink to="/user/test">/user/test</NuxtLink>
        </span>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><document /></el-icon>
        <span>
          <NuxtLink :to="{ name: 'user-id', params: { id: 7 } }"
            >/user/:id</NuxtLink
          >
        </span>
      </el-menu-item>
      <el-menu-item index="5">
        <el-icon><setting /></el-icon>
        <span>
          <NuxtLink to="/about">about</NuxtLink>
        </span>
      </el-menu-item>
      <el-menu-item index="6">
        <el-icon><Connection /></el-icon>
        <span>
          <NuxtLink to="/omg">404</NuxtLink>
        </span>
      </el-menu-item>
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
