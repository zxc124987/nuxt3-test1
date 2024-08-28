<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  ChatRound,
  Location,
  Setting,
  Connection,
} from "@element-plus/icons-vue";

interface Menu {
  children_items: Object[];
  ma_permission: Number;
  mi_code: String;
  mi_name: String;
  mi_order_no: Number;
  mi_path: String;
  mi_sid: String;
  mi_type: Number;
  sel_type: any;
}

const props = defineProps<{
  menuSwitch: boolean;
  sidebarMenu: Menu;
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
      <template v-for="(menu1, index1) in props.sidebarMenu">
        <el-sub-menu
          v-if="menu1.children_items.length"
          :key="menu1.mi_sid"
          :index="index1 + 1"
        >
          <template #title>
            <el-icon><location /></el-icon>
            <span>{{ menu1.mi_name }}</span>
          </template>
          <el-menu-item
            v-for="(menu2, index2) in menu1.children_items"
            :key="menu2.mi_sid"
            :index="`${index1 + 1}-${index2 + 1}`"
          >
            <el-icon><icon-menu /></el-icon>
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
