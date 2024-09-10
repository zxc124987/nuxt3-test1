export default defineEventHandler(async (event) => {
  const apiUrl = process.env.API_URL;
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const body = await readBody(event);

  const data = await $fetch(`${apiUrl}/blacklist/list`, {
    method: "POST",
    body: body,
  });
  return data;
})
