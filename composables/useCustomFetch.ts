import { useApp1 } from "@/composables/useApp";
import type { Response } from "~/models/response";

export async function useCustomFetch(url: string, options?: any) {
  const { loading } = useApp1();

  loading.value = true;
  // 請求攔截
  // console.log('Intercepting request:', url, options);

  // 修改請求的 headers 或其他參數
  if (options) {
    options.headers = {
      ...options.headers,
    };
  }

  // 使用原始 useFetch 發起請求
  const { data, error, refresh
  } = await useFetch<Response>(url, options);

  // 偵聽攔截
  watchEffect(() => {
    setTimeout(() => {
      if (data.value) {
        if (!data.value.success) return;
        loading.value = false;
        console.log(data.value);
      }
    }, 1000);
  });

  return { data, error, refresh };
}