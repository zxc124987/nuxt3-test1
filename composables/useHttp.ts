import { useCommon } from "~/composables/useCommon";

export async function useHttp(url: string, options?: object, showMsg: boolean = true) {
  const config = useRuntimeConfig();
  const apiUrl = config.public.apiUrl;
  const { loading } = useCommon();

  const { data, pending, error, refresh
  } = await useFetch<any>(`${apiUrl}/${url}`, {
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
    watch: false,
    ...options
  });

  if (error.value) {
    console.error('Error fetching data:', error.value);
  }

  watch(pending, (newValue) => {
    // console.log(newValue);
    loading.value = newValue;
  })

  return { data, pending, error, refresh };
}