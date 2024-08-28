import { useHttp } from "~/composables/useHttp";
import { useApp } from "@/composables/useApp";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const config = useRuntimeConfig();
  const apiUrl = config.public.apiUrl;
  const { sidebarMenu } = useApp();

  if (to.name === "index") return;
  const { data } = await useHttp(`${apiUrl}Acct/logontest`, null, false);
  // if (!data?.value?.success || null) return navigateTo("/");
  sidebarMenu.value = data?.value?.result_obj?.menu_items2;
});
