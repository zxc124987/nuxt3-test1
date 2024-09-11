<script setup lang="ts">
const route = useRoute();
const id = Number(route.params.id);
const { data } = await useFetch(`/api/testDetail/${id}`);
console.log(data);
</script>

<template>
  <div>Page: test/{{ $route.params.id }}</div>
</template>

<style scoped></style>
