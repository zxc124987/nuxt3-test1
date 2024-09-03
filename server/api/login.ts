import { newUseHttp } from "~/composables/newUseHttp";
import type { Login } from "../../types/login"

export function loginService() {
  const config = useRuntimeConfig();
  const apiUrl = config.public.apiUrl;

  const login = (data: Login) => {
    return newUseHttp.post(`${apiUrl}/acct/login`, data)
  }

  const logout = () => {
    return newUseHttp.get(`${apiUrl}/acct/logout`)
  }

  const logonTest = () => {
    return newUseHttp.get(`${apiUrl}/acct/logontest`)
  }

  return { login, logout, logonTest }
}
