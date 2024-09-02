import { useHttp } from "~/composables/useHttp";
import { useApp } from "@/composables/useApp";
import { newUseHttp } from "~/composables/newUseHttp";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { sidebarMenu } = useApp();
  const config = useRuntimeConfig();
  const apiUrl = config.public.apiUrl;

  if (to.name === "index") return;
  const { data } = await newUseHttp.get(`${apiUrl}/Acct/logontest`, null, false);
  // if (!data?.value?.success || null) return navigateTo("/");
  sidebarMenu.value = data?.value?.result_obj?.menu_items2;
});
