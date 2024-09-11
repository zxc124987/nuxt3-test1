export default defineEventHandler(async (event) => {
  const apiUrl = process.env.API_URL;
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  let auth = getCookie(event, 'E_Auth')
  setCookie(event, 'E_Auth', auth)

  const data = await fetch(`${apiUrl}/acct/logontest`, {
    withCredentials: true,
  });
  return data;
});
