import { loginService } from "@/server/api/login";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { sidebarMenu, userInfo } = useCommon();

  if (process.server) return;
  if (to.path !== "/login") {
    const { data } = await loginService().logonTest();
    sidebarMenu.value = data?.value?.result_obj?.menu_items2;
    if (!data?.value?.success) {
      return navigateTo("/login");
    }
  }
});
