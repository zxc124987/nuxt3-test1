// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: true,
  modules: [
    "@element-plus/nuxt", "@nuxtjs/google-fonts", "@pinia/nuxt"
  ],
  googleFonts: {
    families: {
      'Noto Sans TC': {
        wght: [400, 500, 600, 700],
      },
      'Roboto': {
        wght: [400, 500, 600, 700],
      },
    },
    download: true, // 將字體下載到本地，並打包到專案裡，防止用戶訪問不了google字體服務
    base64: false, // 不要 base64格式，不然首頁下載文件會非常大
    overwriting: true,
    outputDir: 'assets/fonts' // 本地字體文件目錄，下載的字體會放到這個目錄裡
  },
  css: [
    "element-plus/dist/index.css",
    '~/assets/sass/main.sass',
    '~/assets/sass/button.sass',
    '~/assets/sass/normalize/normalize.css'
  ],
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
      appName: process.env.APP_NAME,
    },
  },
  plugins: [
    '~/plugins/element-plus.ts'
  ],
  nitro: {
    routeRules: {
      '/api/**': {
        cors: {
          origin: 'https://122.146.250.130', // 允許的前端域名
          methods: ['GET', 'POST', 'PUT', 'DELETE'], // 允許的請求方法
          credentials: true, // 啟用憑證支持
          allowedHeaders: ['Content-Type', 'Authorization'], // 允許的標頭
          exposedHeaders: ['Set-Cookie'], // 允許暴露的標頭
        },
      },
    },
  },
})
