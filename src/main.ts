import { createApp } from "vue";
import { createPinia } from "pinia";
import { useStore } from "@/stores";
import App from "@/App.vue";
import router from "@/router";
import directives from '@/directives';
import filters from '@/filters';
import vconsole from "vconsole";
import Schemes from '@likg/schemes';

import "@/utils/rem";
import "@/assets/styles/main.css";
import "vant/es/toast/style";


console.log("——————————————————————————————————————————————————");
console.log("API_HOST：", import.meta.env.VITE_API_HOST);
console.log("——————————————————————————————————————————————————");

// 👉 vconsole
if (import.meta.env.VITE_ENV !== "prod") {
  new vconsole();
}

// 👉 app
// 1. 创建app
const app = createApp(App);
// 2. 注入依赖
app.use(createPinia());
app.use(router);
// 3. 配置全局属性，访问：在setup函数中通过ctx访问，如：ctx.$filters
app.config.globalProperties.$filters = filters;
// 4. 挂载app
app.mount("#app");

// 👉 自定义指令
directives(app);

// 👉  配置Schemes(提示：原生嵌套H5时配置)
Schemes.config('xxx://www.xxx.com', '二级目录');

// 👉 持久化pinia
const store = useStore();
// 页面进入：合并状态
const localState = localStorage.getItem("PINIA_PERSISTENCE");
if (localState) {
  console.log("[温馨提示]：合并Store...");
  store.$state = JSON.parse(localState);
}
// 页面刷新：存储状态
window.addEventListener("beforeunload", () => {
  console.log("[温馨提示]：缓存Store...");
  localStorage.setItem("PINIA_PERSISTENCE", JSON.stringify(store.$state));
});
