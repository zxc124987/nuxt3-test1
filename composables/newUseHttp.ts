import { useApp } from "@/composables/useApp";

function fetch(url: string, options?: object) {
  const { loading } = useApp();

  return useFetch<any>(url, {
    onRequest({ request, options }) {
      // 設定請求時的 headers
      loading.value = true;
      // console.log("onRequest");
    },
    onRequestError({ request, options, error }) {
      // 捕捉請求時發生的錯誤
      // console.log("onRequestError");
    },
    onResponse({ request, response, options }) {
      // 處理請求回覆資料
      loading.value = false;
      return response._data;
    },
    onResponseError({ request, response, options }) {
      // 捕捉請求回覆時發生的錯誤
      // console.log("onResponseError");
    },
    credentials: 'include',
    watch: false,
    ...options
  })
}

export const newUseHttp = {
  get: <T>(url: string, params?: any) => {
    return fetch(url, { method: "GET", params })
  },
  post: <T>(url: string, body?: any) => {
    return fetch(url, { method: "POST", body })
  },
  put: <T>(url: string, body?: any) => {
    return fetch(url, { method: "PUT", body })
  },
  delete: <T>(url: string, body?: any) => {
    return fetch(url, { method: "DELETE", body })
  },
}