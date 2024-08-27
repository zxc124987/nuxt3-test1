// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    "@element-plus/nuxt", "@nuxtjs/google-fonts", "@pinia/nuxt"
  ],
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
