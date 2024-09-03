export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isLoggedIn } = useApp();

  if (!isLoggedIn.value && to.path !== "/login") {
    ElMessage({
      message: "未登入",
      type: "error",
    });
    return navigateTo("/login");
  }
});
