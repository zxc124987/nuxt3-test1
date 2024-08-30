import { useApp } from "@/composables/useApp";

export async function useHttp(url: string, options?: object, showMsg: boolean = true) {
  const { loading } = useApp();

  const { data, pending, error, refresh
  } = await useFetch<any>(url, {
    onResponse({ response }) {
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

  watch(pending, (newValue) => {
    loading.value = newValue;
  })

  return { data, pending, error, refresh };
}