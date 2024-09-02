import { newUseHttp } from "~/composables/newUseHttp";
import type { Login } from "~/types/login";
import type { ApiResponse } from "~/types/apiResponse";

const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;

enum Api {
  login = "acct/login",
  logonTest = "Acct/logontest",
  logout = "acct/logout"
}

export async function login(params: Login) {
  return newUseHttp.post(`${apiUrl}/${Api.login}`, params)
}

export async function logonTest() {
  return newUseHttp.get(`${apiUrl}/${Api.logonTest}`)
}

export async function logout() {
  return newUseHttp.get(`${apiUrl}/${Api.logout}`)
}
