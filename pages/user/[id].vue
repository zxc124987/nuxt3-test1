<script setup lang="ts">
const route = useRoute()
const { id } = route.params
onMounted(() => {
  console.log(route.params);
})
</script>


<template>
  <div>
    id: {{ id }}
  </div>
</template>