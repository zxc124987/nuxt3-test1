<script setup>
import { Delete, ArrowRight } from "@element-plus/icons-vue";
import { useHttp } from "#imports";

const form = ref({
  ai_path: "",
  mi_name: "",
});
const rules = ref({});
const currentPage = ref(1);
const pageSize = ref(10);
const drawer = ref(false);
const drawerForm = ref({
  ai_sid: "",
  ai_path: "",
  mi_sid: "",
  ai_permission: null,
});
const drawerFormRules = ref({
  ai_path: [{ required: true, message: "必填", trigger: "blur" }],
  mi_sid: [{ required: true, message: "必填", trigger: "change" }],
  ai_permission: [{ required: true, message: "必填", trigger: "change" }],
});
const aiPermissionListData = [
  { item_text: "唯讀", item_value: 1 },
  { item_text: "所有權限/有權限", item_value: 4 },
];
const drawerFormRef = ref(null);
const webApiList = ref([]);
const miSidList = ref([]);
const drawerIsAdd = ref(false);

const tableData = computed(() => {
  let data = JSON.parse(JSON.stringify(webApiList.value));
  data.forEach(
    (e) => (e.permission = e.ai_permission === 1 ? "唯讀" : "所有權限/有權限")
  );
  const current = (currentPage.value - 1) * pageSize.value;
  const last = currentPage.value * pageSize.value;
  return data.slice(current, last);
});

const searchFormHandler = async () => {
  const { data: webApiRes } = await useHttp(
    "webApi/list",
    {
      method: "POST",
      body: form.value,
    },
    false
  );
  if (webApiRes.value.success) {
    webApiList.value = webApiRes.value.result_list;
    currentPage.value = 1;
  }
};

const openDrawerHandler = () => {
  drawer.value = true;
  drawerIsAdd.value = true;
};

const openEditDetailDrawerHandler = (item) => {
  drawer.value = true;
  drawerIsAdd.value = false;
  drawerForm.value = { ...drawerForm.value, ...item };
};

const deleteListHandler = async (ai_sid) => {
  const { data: res } = await useHttp("WebApi/Delete", {
    method: "POST",
    body: { ai_sid },
  });
  if (res.value.success) {
    searchFormHandler();
  }
};

const currentChangeHandler = (page) => {
  currentPage.value = page;
};

const closeDrawer = () => {
  drawer.value = false;
  drawerFormRef.value.resetFields();
  drawerForm.value = {};
};

const drawerFormSubmit = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      saveWebApi(drawerForm.value);
    } else {
      ElMessage({
        message: "資料填寫錯誤",
        type: "error",
        duration: 5000,
        showClose: true,
      });
    }
  });
};

const saveWebApi = async (data) => {
  const { data: res } = await useHttp("WebApi/Save", {
    method: "POST",
    body: data,
  });
  if (res.value.success) {
    searchFormHandler();
    closeDrawer();
  }
};

const { data: webApiRes } = await useHttp(
  "webApi/list",
  {
    method: "POST",
    body: form.value,
  },
  false
);
if (webApiRes.value.success) {
  webApiList.value = webApiRes.value.result_list;
}

const { data: miSidRes } = await useHttp(
  "select_item/auth_list",
  {
    method: "POST",
    body: { sel_type: "MENU" },
  },
  false
);
if (miSidRes.value.success) {
  miSidList.value = miSidRes.value.result_list;
}
</script>

<template>
  <div>
    <el-form
      label-position="top"
      require-asterisk-position="right"
      scroll-to-error
      :model="form"
      :rules="rules"
    >
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="API路由" prop="ai_path">
            <el-input placeholder="請輸入" v-model="form.ai_path"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="對應選單" prop="mi_name">
            <el-input placeholder="請輸入" v-model="form.mi_name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-button
      style="margin-bottom: 20px"
      type="primary"
      @click="searchFormHandler"
      >查詢</el-button
    >

    <div style="display: flex; align-items: center; margin-bottom: 20px">
      <div class="custom-main-title mt-4">API管理</div>
      <el-button
        style="margin-left: auto"
        type="primary"
        plain
        @click="openDrawerHandler"
        >新增</el-button
      >
    </div>

    <el-table :data="tableData" table-layout="auto" row-key="ai_sid">
      <el-table-column prop="ai_path" label="API路由" />
      <el-table-column width="45">
        <template #default="{ row }">
          <el-tooltip content="詳細資料" placement="top" effect="dark">
            <el-button
              class="table-detail-button"
              link
              :icon="ArrowRight"
              @click="openEditDetailDrawerHandler(row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="mi_name" label="對應選單" />
      <el-table-column prop="permission" label="需要權限" />
      <el-table-column width="60" label="功能">
        <template #default="{ row }">
          <el-popconfirm
            title="確定要刪除此筆資料嗎?"
            width="250"
            @confirm="deleteListHandler(row.ai_sid)"
          >
            <template #reference>
              <el-button text circle>
                <el-tooltip content="刪除" placement="top" effect="dark">
                  <el-icon size="16px" color="#555AD5"
                    ><Delete style="width: 100%; height: 100%"
                  /></el-icon>
                </el-tooltip>
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="card-list-pagination mt-4 mb-0"
      layout="prev, pager, next, jumper"
      :page-size="pageSize"
      :total="webApiList.length"
      :current-page="currentPage"
      @current-change="currentChangeHandler"
    />

    <el-drawer
      destroy-on-close
      size="45%"
      v-model="drawer"
      @closed="closeDrawer"
    >
      <template #default>
        <el-form
          label-position="top"
          ref="drawerFormRef"
          require-asterisk-position="right"
          scroll-to-error
          :model="drawerForm"
          :rules="drawerFormRules"
        >
          <el-form-item label="API路由" prop="ai_path">
            <el-input
              placeholder="請輸入"
              v-model="drawerForm.ai_path"
            ></el-input>
          </el-form-item>
          <el-form-item label="對應選單" prop="mi_sid">
            <el-select class="w-100" v-model="drawerForm.mi_sid">
              <el-option
                v-for="item in miSidList"
                :key="item.item_value"
                :label="item.item_text"
                :value="item.item_value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="需要權限" prop="ai_permission">
            <el-select class="w-100" v-model="drawerForm.ai_permission">
              <el-option
                v-for="item in aiPermissionListData"
                :key="item.item_value"
                :label="item.item_text"
                :value="item.item_value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-button
          style="margin-top: 12px"
          type="primary"
          @click="drawerFormSubmit(drawerFormRef)"
          >{{ drawerIsAdd ? "新增" : "儲存變更" }}</el-button
        >
      </template>
      <template #footer> </template>
    </el-drawer>
  </div>
</template>

<style scoped></style>
