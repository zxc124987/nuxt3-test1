export default defineEventHandler(async (event) => {
  // const body = await readBody(event);
  // const config = useRuntimeConfig();
  // const apiUrl = config.public.apiUrl;
  const apiUrl = process.env.API_URL;
  const response = await fetch(`${apiUrl}/api/post_card`);
  const data = await response.json();
  return data;
});
