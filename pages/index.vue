<script setup>
// const { data } = await useFetch(
//   "https://60bd9841ace4d50017aab3ec.mockapi.io/api/post_card"
// );

const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;
const res = ref(null);

async function login() {
  const { data } = await useFetch(`${apiUrl}acct/login`, {
    method: "post",
    body: {
      acct_id: "Hank",
      pword: "a8888888",
    },
  });
}

// async function logontest() {
//   const { data } = await useFetch(`${apiUrl}acct/logontest`);
//   console.log(data);
// }
</script>

<template>
  <div>
    <h1>Page: index</h1>
    <el-button @click="login">login</el-button>
    <!-- <el-button @click="logontest">logontest</el-button> -->
  </div>
</template>

<style scoped></style>
