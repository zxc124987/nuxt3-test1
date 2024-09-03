<script setup lang="ts">
definePageMeta({ layout: false });
import type { FormInstance, FormRules } from "element-plus";
import type { Login } from "../types/login";
import { useHttp } from "@/composables/useHttp";
import { loginService } from "../server/api/login";
import type { ApiResponse } from "~/types/apiResponse";

const { isLoggedIn } = useApp();
const router = useRouter();

const formRef = ref<any>();
const form = ref<Login>({
  acct_id: "",
  pword: "",
});
const rules = ref<FormRules<Login>>({
  acct_id: [{ required: true, message: "必填", trigger: "change" }],
  pword: [{ required: true, message: "必填", trigger: "change" }],
});

function submit(formEl: FormInstance) {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      const hardcode = {
        acct_id: "first_test",
        pword: "test1234",
      };
      const { data } = await loginService().login(hardcode);
      ElMessage({
        message: data?.value?.message,
        type: data?.value?.success ? "success" : "error",
      });
      if (!data?.value?.success) return;
      isLoggedIn.value = true;
      router.push({ name: "index" });
    } else {
      ElMessage({
        message: "表單輸入錯誤",
        type: "error",
      });
    }
  });
}

onMounted(async () => {
  isLoggedIn.value = false;
});
</script>

<template>
  <div class="login">
    <el-form label-position="top" ref="formRef" :model="form" :rules="rules">
      <el-form-item label="帳號" prop="acct_id">
        <el-input
          type="text"
          v-model="form.acct_id"
          placeholder="請輸入"
        ></el-input>
      </el-form-item>
      <el-form-item label="密碼" prop="pword">
        <el-input
          type="password"
          v-model="form.pword"
          show-password
          placeholder="請輸入"
        ></el-input>
      </el-form-item>
      <el-button type="primary" @click="submit(formRef)">送出</el-button>
    </el-form>
  </div>
</template>

<style scoped lang="sass">
.login
  height: 100vh
  background: linear-gradient(135deg, rgb(245, 245, 248) 22px, #0000000a 22px, #0000000a 24px, transparent 24px, transparent 67px, #0000000a 67px, #0000000a 69px, transparent 69px), linear-gradient(225deg, rgb(245, 245, 248) 22px, #0000000a 22px, #0000000a 24px, transparent 24px, transparent 67px, #0000000a 67px, #0000000a 69px, transparent 69px) 0 64px
  background-color: rgb(245, 245, 248)
  background-size: 64px 128px

  .el-form
    width: 300px
    padding: 40px
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    background-color: #ffffff
    border-radius: 10px
    border: 1px solid #c8ced3

    .el-button
      width: 100%
      margin-top: 20px
</style>
