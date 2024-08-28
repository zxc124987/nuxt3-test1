import { useApp } from "@/composables/useApp";

export async function useHttp(url: string, options?: object, showMsg: boolean = true) {
  const { loading } = useApp();

  const { data, error, refresh
  } = await useFetch<any>(url, {
    onRequest({ options }) {
      loading.value = true;
    },
    onRequestError({ request, options, error }) {
      loading.value = false;
    },
    onResponse({ response }) {
      loading.value = false;
      if (showMsg) {
        ElMessage({
          message: response._data.message,
          type: response._data.success ? "success" : "error",
        })
      }
      return response._data
    },
    credentials: 'include',
    ...options
  });

  return { data, error, refresh };
}