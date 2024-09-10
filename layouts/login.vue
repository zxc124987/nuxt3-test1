<script setup lang="ts">
const { loading } = useCommon();
</script>

<template>
  <div v-loading.fullscreen.lock="loading">
    <slot />
  </div>
</template>

<style scoped></style>
