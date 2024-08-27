// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    "@element-plus/nuxt", "@nuxtjs/google-fonts", "@pinia/nuxt"
  ],
  googleFonts: {
    families: {
      'Noto Sans TC': true,
      'Roboto': true,
    },
    download: true, // 將字體下載到本地，並打包到專案裡，防止用戶訪問不了google字體服務
    base64: false, // 不要 base64格式，不然首頁下載文件會非常大
    overwriting: true,
    outputDir: 'assets/fonts' // 本地字體文件目錄，下載的字體會放到這個目錄裡
  },
  css: [
    "element-plus/dist/index.css",
    '~/assets/sass/main.sass'
  ],
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL || 'https://default.api.com',
      appName: process.env.APP_NAME || 'DefaultAppName'
    },
    // 私有環境變量
    // private: {
    //   secret: process.env.SECRET_KEY || 'defaultSecret'
    // }
  }
})
