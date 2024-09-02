import { useApp } from "@/composables/useApp";
import type { ApiResponse } from "~/types/apiResponse";

interface ResOptions<T> {
  data: T
  code: number
  success: boolean
  message: string
}

function fetch<T>(url: string, options?: object) {
  const { loading } = useApp();

  return useFetch<ResOptions<T>>(url, {
    // 設定請求時的 headers
    onRequest({ request, options }) {
      loading.value = true;
    },
    // 捕捉請求時發生的錯誤
    onRequestError({ request, options, error }) {
      console.log("onRequestError");
    },
    // 處理請求回覆資料
    onResponse({ request, response, options }) {
      loading.value = false;
      return response._data;
    },
    // 捕捉請求回覆時發生的錯誤
    onResponseError({ request, response, options }) {
      ElMessage({
        message: `${response?.status} Error`,
        type: "error",
      });
    },
    credentials: 'include',
    watch: false,
    ...options
  })
}

export const newUseHttp = {
  get: (url: string, params?: any) => {
    return fetch(url, { method: "GET", params })
  },
  post: (url: string, body?: any) => {
    return fetch(url, { method: "POST", body })
  },
  put: (url: string, body?: any) => {
    return fetch(url, { method: "PUT", body })
  },
  delete: (url: string, body?: any) => {
    return fetch(url, { method: "DELETE", body })
  },
}