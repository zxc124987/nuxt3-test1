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
        <el-col :span="12">
          <el-form-item label="PID代碼" prop="bl_pid">
            <el-input placeholder="請輸入" v-model="form.bl_pid"></el-input>
          </el-form-item>
          <el-form-item label="修改人" prop="md_user_name">
            <el-input
              placeholder="請輸入"
              v-model="form.md_user_name"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="溝通渠道" prop="chan_name">
            <el-input placeholder="請輸入" v-model="form.chan_name"></el-input>
          </el-form-item>
          <el-form-item label="修改日期">
            <el-row style="display: flex; flex-wrap: nowrap; width: 100%">
              <el-col :span="11">
                <el-date-picker
                  style="width: 100%"
                  type="date"
                  placeholder="請選擇"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  v-model="form.md_date_min"
                  @change="changeDateHandler"
                />
              </el-col>
              <el-col style="text-align: center" :span="2">~</el-col>
              <el-col :span="11">
                <el-date-picker
                  style="width: 100%"
                  type="date"
                  placeholder="請選擇"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  v-model="form.md_date_max"
                  @change="changeDateHandler"
                />
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-button style="margin-bottom: 30px" type="primary">查詢</el-button>

    <div style="display: flex; align-items: center; margin-bottom: 15px">
      <div
        style="
          font-size: 20px;
          font-weight: 500;
          color: #3b3c70;
          margin-bottom: 15px;
        "
      >
        黑名單
      </div>
      <el-button
        style="margin-left: auto"
        type="primary"
        plain
        @click="addHandleOpenDrawer"
        >新增</el-button
      >
    </div>

    <el-table :data="tableData" table-layout="auto" row-key="bl_pid">
      <el-table-column prop="bl_pid" label="PID代碼">
        <template #default="{ row }">
          <div style="font-weight: 500">{{ row.bl_pid }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="chan_name" label="溝通渠道" />
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
      <el-table-column prop="pi_name_mask" label="姓名" />
      <el-table-column show-overflow-tooltip prop="bl_memo" label="備註" />
      <el-table-column prop="md_user_name" label="修改人" />
      <el-table-column prop="md_date" label="修改日期" />
      <el-table-column label="功能">
        <template #default="{ row }">
          <el-popconfirm
            title="確定要刪除此筆資料嗎?"
            width="250"
            @confirm="deleteHandler(row.bl_pid)"
          >
            <template #reference>
              <el-button link>
                <el-tooltip content="刪除" placement="top" effect="dark">
                  <el-button type="primary" :icon="Delete" text />
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
      :total="blackLists.length"
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
          <el-form-item label="PID代碼" prop="bl_pid">
            <el-select
              class="w-100"
              filterable
              placeholder="請輸入文字查詢"
              v-model="drawerForm.bl_pid"
              @change="changeDrawerPID"
              :disabled="drawerIsAdd ? false : true"
            >
              <el-option
                v-for="item in PIDList"
                :key="item.item_value"
                :label="item.item_text"
                :value="item.item_value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="溝通渠道" prop="chan_sids">
            <el-select
              class="w-100"
              multiple
              filterable
              placeholder="請輸入文字查詢"
              v-model="drawerForm.chan_sids"
            >
              <el-option
                v-for="item in chnlList"
                :key="item.item_value"
                :label="item.item_text"
                :value="item.item_value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-row :gutter="20">
            <el-col>
              <el-form-item label="姓氏(系統自動產生)" prop="pi_firstname">
                <el-input
                  v-model="drawerForm.pi_firstname"
                  disabled
                ></el-input> </el-form-item
            ></el-col>
            <el-col>
              <el-form-item label="名字(系統自動產生)" prop="pi_lastname">
                <el-input
                  v-model="drawerForm.pi_lastname"
                  disabled
                ></el-input> </el-form-item
            ></el-col>
          </el-row>
          <el-form-item label="備註" prop="bl_memo">
            <el-input
              type="textarea"
              placeholder="請輸入"
              :rows="5"
              maxlength="200"
              show-word-limit
              v-model="drawerForm.bl_memo"
            ></el-input>
          </el-form-item>
          <el-row :gutter="20">
            <el-col>
              <el-form-item label="修改人(系統自動產生)" prop="md_user_name">
                <el-input
                  v-model="drawerForm.md_user_name"
                  disabled
                ></el-input> </el-form-item
            ></el-col>
            <el-col>
              <el-form-item label="修改日期(系統自動產生)" prop="md_date">
                <el-input
                  v-model="drawerForm.md_date"
                  disabled
                ></el-input> </el-form-item
            ></el-col>
          </el-row>
        </el-form>
        <el-button
          style="margin-top: 12px"
          type="primary"
          @click="drawerSubmit(drawerFormRef)"
          >{{ drawerIsAdd ? "新增" : "儲存變更" }}</el-button
        >
      </template>
      <template #footer> </template>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ArrowRight, Delete } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { useHttp } from "@/composables/useHttp";
import type { BlackList } from "../types/blackList";
import type { SelectItem } from "../types/selectItem";

const drawerFormObjectModel = {
  bl_pid: "",
  chan_sids: [],
  pi_firstname: "",
  pi_lastname: "",
  bl_memo: "",
  md_user_name: "",
  md_date: "",
};
const form = ref<BlackList>(drawerFormObjectModel);
const rules = ref<FormRules<BlackList>>({});
const pageSize = ref<number>(10);
const currentPage = ref<number>(1);
const blackLists = ref<BlackList[]>([]);
const drawer = ref<boolean>(false);
const drawerForm = ref<BlackList>({
  bl_pid: "",
  chan_sids: [],
  pi_firstname: "",
  pi_lastname: "",
  bl_memo: "",
  md_user_name: "",
  md_date: "",
});
const drawerFormRules = ref<FormRules<BlackList>>({
  bl_pid: [
    { required: true, validator: changePIDValidator, trigger: "change" },
  ],
  chan_sids: [{ required: true, message: "必填", trigger: "change" }],
});
const drawerIsAdd = ref<boolean>(false);
const PIDList = ref<SelectItem[]>([]);
const chnlList = ref<SelectItem[]>([]);
const drawerFormRef = ref<any>(null);

const tableData = computed<BlackList[]>(() => {
  blackLists.value.forEach(
    (e) => (e.chan_name = e.chan_short_names?.join("/"))
  );
  let data = JSON.parse(JSON.stringify(blackLists.value));
  const current = (currentPage.value - 1) * pageSize.value;
  const last = currentPage.value * pageSize.value;
  return data.slice(current, last);
});

function changeDateHandler() {
  if (
    form.value.md_date_max !== undefined &&
    form.value.md_date_max !== "" &&
    form.value.md_date_min !== undefined &&
    form.value.md_date_max < form.value.md_date_min
  ) {
    ElMessage({
      message: "結束日期不可小於起始日期",
      type: "error",
      duration: 5000,
      showClose: true,
    });
    form.value.md_date_max = "";
  }
}

function closeDrawer() {
  drawer.value = false;
  drawerForm.value = JSON.parse(JSON.stringify(drawerFormObjectModel));
}

async function addHandleOpenDrawer() {
  drawer.value = true;
  drawerIsAdd.value = true;
  drawerFormRules.value.bl_pid = [
    { required: true, validator: changePIDValidator, trigger: "change" },
  ];
}

async function openEditDetailDrawerHandler(item: BlackList) {
  drawer.value = true;
  drawerIsAdd.value = false;
  drawerForm.value = { ...drawerForm.value, ...item };
  drawerFormRules.value.bl_pid = [];
}

async function deleteHandler(bl_pid: string) {
  deleteBlackListHandler(bl_pid);
}

function currentChangeHandler(val: number) {
  currentPage.value = val;
}

function changeDrawerPID(pid: string) {
  const target: SelectItem | undefined = PIDList.value.find(
    (el) => el.item_value === pid
  );
  if (!target) return;
  drawerForm.value.pi_firstname = target.other_text1;
  drawerForm.value.pi_lastname = target.other_text2;
}

function changePIDValidator(rule: any, val: string, callback: any) {
  if (!val) {
    callback(new Error("必填"));
  } else {
    const target: any = blackLists.value.find((e) => e.bl_pid === val);
    if (target === undefined) {
      callback();
    } else {
      callback(new Error("代碼PID重複"));
    }
  }
}

function drawerSubmit(formEl: FormInstance) {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      if (drawerIsAdd.value) {
        createBlackList(drawerForm.value);
      } else {
        editBlackList(drawerForm.value);
      }
    } else {
      ElMessage({
        message: "資料填寫錯誤",
        type: "error",
        duration: 5000,
        showClose: true,
      });
    }
  });
}

/** call api */

async function getBlackList(form: object) {
  try {
    const { data } = await useHttp(
      `blacklist/list`,
      {
        method: "post",
        body: form,
      },
      false
    );
    if (!data.value.success) return;
    blackLists.value = data.value.result_list;
  } catch (err) {
    console.log(err);
  }
}

async function getChnlList() {
  try {
    const { data } = await useHttp(
      `select_item/list`,
      {
        method: "post",
        body: { sel_type: "CHNL" },
      },
      false
    );
    chnlList.value = data.value.result_list;
  } catch (err) {
    console.log(err);
  }
}

async function getPIDList() {
  try {
    const { data } = await useHttp(
      `select_item/list`,
      {
        method: "post",
        body: { sel_type: "PID" },
      },
      false
    );
    PIDList.value = data.value.result_list;
  } catch (err) {
    console.log(err);
  }
}

async function createBlackList(formData: BlackList) {
  const { data } = await useHttp(`blacklist/create`, {
    method: "POST",
    body: formData,
  });
  if (data.value.success) {
    currentPage.value = 1;
    await getBlackList(form.value);
    closeDrawer();
  }
}

async function editBlackList(formData: BlackList) {
  const { data } = await useHttp(`blacklist/edit`, {
    method: "POST",
    body: formData,
  });
  if (data.value.success) {
    currentPage.value = 1;
    await getBlackList(form.value);
    closeDrawer();
  }
}

async function deleteBlackListHandler(bl_pid: string) {
  const { data } = await useHttp(`blacklist/delete`, {
    method: "delete",
    body: { bl_pid },
  });
  if (data.value.success) {
    await getBlackList(form.value);
  }
}

onMounted(async () => {
  await getBlackList(form.value);
  await getChnlList();
  await getPIDList();
});
</script>

<style lang="sass" scoped>
</style>