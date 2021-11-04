import JwtService from "@/services/jwt.service";
import * as authApi from "@/apis/auth";
import Vue from "vue";

const state = {
  errors: [],
  user: {},
  isAuthenticated: !!JwtService.getToken()
};

const getters = {
  me(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  getErrors(state) {
    return state.errors;
  }
};

const actions = {
  async login({ commit }, credentials) {
    const res = await authApi.login(credentials);

    if (res?.data?.key) {
      JwtService.saveToken(res.data.key);
      const { data } = await authApi.getUser();

      if (data?.pk) {
        commit("setUser", data);
      } else {
        commit(
          "showNotification",
          { type: "danger", message: data?.detail },
          { root: true }
        );
      }
    } else {
      let message = "";
      if (res?.data?.non_field_errors) message = res.data.non_field_errors[0];
      else {
        message = Object.keys(res?.data)
          .map(key => res?.data[key])
          .join(",");
      }
      commit(
        "showNotification",
        { type: "danger", message: message },
        { root: true }
      );
    }
  },

  async register({ commit }, credentials) {
    const res = await authApi.register(credentials);

    if (res?.data?.key) {
      JwtService.saveToken(res.data.key);
      const { data } = await authApi.getUser();

      if (data?.pk) {
        commit("setUser", data);
      } else {
        commit(
          "showNotification",
          { type: "danger", message: data?.detail },
          { root: true }
        );
      }
    } else {
      /**
       *  combine error messages.
       *  - email: ["A user is already registered with this e-mail address."]
       */
      const message = Object.keys(res?.data)
        .map(key => res?.data[key])
        .join(",");

      commit(
        "showNotification",
        { type: "danger", message },
        {
          root: true
        }
      );
    }
  },

  async resetPassword({ commit }, email) {
    const { data } = await authApi.resetPassword(email);
    if (data?.detail) {
      commit(
        "showNotification",
        {
          type: "info",
          message: data?.detail
        },
        { root: true }
      );
    } else {
      const message = data?.email?.email;

      commit(
        "showNotification",
        { type: "danger", message },
        {
          root: true
        }
      );
    }
  },

  async changePassword({ commit }, credentials) {
    const res = await authApi.changePassword(credentials);

    if (res?.data?.key) {
      const { data } = await authApi.getUser();

      if (data?.pk) {
        commit("setUser", data);
      } else {
        commit(
          "showNotification",
          { type: "danger", message: data?.detail },
          { root: true }
        );
      }
    } else {
      commit(
        "showNotification",
        { type: "danger", message: res?.data?.detail },
        { root: true }
      );
    }
  },

  async getUser({ commit }) {
    const { data } = await authApi.getUser();

    if (data?.pk) {
      commit("setUser", data);
    } else {
      commit(
        "showNotification",
        { type: "danger", message: data?.detail },
        { root: true }
      );
    }
  },

  async updateUser({ commit }) {
    const { data } = await authApi.getUser();

    if (data?.pk) {
      commit("setUser", data);
    } else {
      commit(
        "showNotification",
        { type: "danger", message: data?.detail },
        { root: true }
      );
    }
  },

  async logout({ commit }) {
    await authApi.logout();

    commit("setLogout");
  }
};

const mutations = {
  setUser(state, data) {
    Vue.set(state, "isAuthenticated", true);
    Vue.set(state, "user", data);
  },
  setLogout() {
    state.isAuthenticated = false;
    state.user = null;
    JwtService.destroyToken();
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
