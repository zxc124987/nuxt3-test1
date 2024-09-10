export default defineEventHandler(async (event) => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const apiUrl = process.env.API_URL;
  const data = await $fetch(`${apiUrl}/acct/logout`);
  return data;
})