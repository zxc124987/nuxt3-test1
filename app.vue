<script lang="ts" setup>
onMounted(() => {});
</script>


<template>
  <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-container>
          <el-main>
            <NuxtPage />
          </el-main>
          <el-footer>Footer</el-footer>
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
