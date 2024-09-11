<script setup lang="ts">
const { loading } = useCommon();

interface List {
  avatar: String;
  content: String;
  createdAt: String;
  id: PropertyKey;
  name: String;
  photo: String;
  post_date: number;
  type: String;
}

const currentPage = ref(1);
const pageSize = ref(10);
const lists: Ref<Array<List>> = ref([]);
const tableData: Ref<Array<List>> = computed(() => {
  const data = JSON.parse(JSON.stringify(lists.value));
  const current = (currentPage.value - 1) * pageSize.value;
  const last = currentPage.value * pageSize.value;
  return data.slice(current, last);
});

const currentChangeHandler = (page: number) => {
  currentPage.value = page;
};

const { data: res } = await useFetch<any>("/api/test", {
  onRequest({ request, options }) {
    loading.value = true;
  },
  onResponse({ request, response, options }) {
    loading.value = false;
    return response._data;
  },
});
lists.value = res.value;
</script>

<template>
  <div>
    <p style="margin-bottom: 30px">Page: test</p>

    <el-table :data="tableData" table-layout="auto" row-key="ai_sid">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="avatar" label="Avatar" />
      <el-table-column prop="content" label="Content" />
      <el-table-column prop="createdAt" label="CreateAt" />
      <el-table-column prop="photo" label="Photo" />
      <el-table-column prop="post_date" label="PostDate" />
      <el-table-column prop="type" label="Type" />
      <el-table-column width="60" label="Views">
        <template #default="{ row }">
          <NuxtLink :to="`/testDetail/${row.id}`">Views</NuxtLink>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="card-list-pagination mt-4 mb-0"
      layout="prev, pager, next, jumper"
      :page-size="pageSize"
      :total="lists.length"
      :current-page="currentPage"
      @current-change="currentChangeHandler"
    />

    <!-- <ul style="margin-top: 30px">
      <li style="margin-bottom: 15px" v-for="item in lists" :key="item.id">
        <p>id: {{ item.id }}</p>
        <p>avatar: {{ item.avatar }}</p>
        <p>content: {{ item.content }}</p>
        <p>createdAt: {{ item.createdAt }}</p>
        <p>name: {{ item.name }}</p>
        <p>photo: {{ item.photo }}</p>
        <p>post_date: {{ item.post_date }}</p>
        <p>type: {{ item.type }}</p>
      </li>
    </ul> -->
  </div>
</template>

<style scoped></style>
