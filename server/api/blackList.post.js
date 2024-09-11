export default defineEventHandler(async (event) => {
  const apiUrl = process.env.API_URL;
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const body = await readBody(event);

  const data = await fetch(`${apiUrl}/BlackList/List`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return data;
})
