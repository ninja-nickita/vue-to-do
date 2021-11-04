import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import app from "./app";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notification: {
      type: "info", // "info" || "danger"
      message: null
    }
  },
  getters: {
    notification(state) {
      return state.notification;
    }
  },
  mutations: {
    showNotification(state, payload) {
      Vue.set(state, "notification", payload);
    }
  },
  modules: {
    auth,
    app
  }
});
