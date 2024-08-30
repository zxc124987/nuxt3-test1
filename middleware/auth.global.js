import { useHttp } from "~/composables/useHttp";
import { useApp } from "@/composables/useApp";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { sidebarMenu } = useApp();

  if (to.name === "index") return;
  const { data } = await useHttp(`Acct/logontest`, null, false);
  // if (!data?.value?.success || null) return navigateTo("/");
  sidebarMenu.value = data?.value?.result_obj?.menu_items2;
});
