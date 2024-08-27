import { useApp } from "@/composables/useApp";
import type { Response } from "~/models/response";

export async function useHttp(url: string, options?: any) {
  const { loading } = useApp();

  loading.value = true;
  // 請求攔截
  // console.log('Intercepting request:', url, options);

  // 修改請求的 headers 或其他參數
  if (options) {
    options.headers = {
      ...options.headers,
    };
  }

  const { data, error, refresh
  } = await useFetch<any>(url, options);

  // 偵聽攔截
  watchEffect(() => {
    if (data.value) {
      if (!data.value.success) return;
      loading.value = false;
    }
  });

  return { data, error, refresh };
}