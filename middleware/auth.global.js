export default defineNuxtRouteMiddleware(async (to, from) => {

  if (to.path !== "/login") {
    // return navigateTo("/login");
  }
});
