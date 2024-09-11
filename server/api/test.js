export default defineEventHandler(async (event) => {
  // const body = await readBody(event);
  // const config = useRuntimeConfig();
  // const apiUrl = config.public.apiUrl;
  // https://60bd9841ace4d50017aab3ec.mockapi.io/api/post_card
  const apiUrl = process.env.API_URL;
  const response = await $fetch(
    "https://60bd9841ace4d50017aab3ec.mockapi.io/api/post_card"
  );
  return response;
});
