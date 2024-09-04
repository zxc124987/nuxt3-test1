import { loginService } from "~/server/api/login";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const commonStore = useCommonStore();

  if (!process.server) {
    if (to.path !== "/login") {
      const { data, refresh } = await loginService().logonTest();
      commonStore.sidebarMenu = data?.value?.result_obj?.menu_items2;
    }
  }
});
