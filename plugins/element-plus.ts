import { defineNuxtPlugin } from '#app';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhTW from 'element-plus/dist/locale/zh-tw.mjs';

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(ElementPlus, { locale: zhTW });
});