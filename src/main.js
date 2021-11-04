import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VeeValidate from "vee-validate";
import { ValidationProvider } from "vee-validate";
import JwtService from "@/services/jwt.service";
import axios from "axios";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VeeValidate, { fieldsBagName: "veeFields" });

Vue.component("ValidationProvider", ValidationProvider);

Vue.config.productionTip = false;

router.beforeEach(async (to, from, next) => {
  // Ensure we checked auth before each page load.
  if (to?.meta?.auth) {
    if (JwtService.getToken()) {
      await store.dispatch("getUser");
      next();
    } else {
      next({ name: "login" });
    }
  } else {
    next();
  }
});

axios.interceptors.request.use(
  config => {
    const token = JwtService.getToken();
    if (token) {
      config.headers["Authorization"] = "Token " + token;
    }
    let urls = config.url.split("/");
    if (
      urls[1] === "apps" &&
      (config.method !== "get" || config.method !== "delete")
    ) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else config.headers["Content-Type"] = "application/json";
    return config;
  },
  error => {
    return error;
  }
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
