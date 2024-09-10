export default defineNuxtRouteMiddleware(async (to, from) => {
  const isLogin = useCookie("isLogin");
  const { menu } = useCommon();

  if (!isLogin.value && to.name !== "login") {
    return navigateTo("/login");
  }

  // if (process.client) {
  //   if (isLogin.value && to.name !== "login") {
  //     const config = useRuntimeConfig();
  //     const apiUrl = config.public.apiUrl;
  //     const res = await fetch(`${apiUrl}/acct/logontest`, {
  //       credentials: "include",
  //     });
  //     const data = await res.json();
  //     if (!data.success) {
  //       ElMessage({
  //         message: data.message,
  //         type: "error",
  //       });
  //       return navigateTo("/login");
  //     }
  //     menu.value = data.result_obj.menu_items2;
  //   }
  // }
});
