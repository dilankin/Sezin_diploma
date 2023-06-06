import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    terapistIndex: 1,
    openLoginModal: false,
    openRegisterModal: false,
    openPremiumModal: false,
    openChat: false,
    type_user: false,
    openBuyModal: false,
    lang: localStorage.getItem('lang') || "ru",
    auth: localStorage.getItem("access_token") ? true : false,
    user: {},
    loading: false,
  },
  getters: {
    getLoading: (state) => state.loading,
    getAuth(state) {
      return state.auth;
    },
    getLang: (state) => state.lang,
    getUser: (state) => state.user,
    getType: (state) => state.type_user,
  },
  mutations: {
     UPDATE_LANG(state, lang) {
        state.lang = lang
        localStorage.setItem("lang", lang);
    },
    SET_AUTH(state, auth) {
      state.auth = auth;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TYPE(state, user) {
      state.type_user = user;
    },

    SET_LOADING(state, value) {
      state.loading = value;
    },
  },
  actions: {
    checkAuth({ commit }) {
      if (localStorage.getItem("access_token")) commit("SET_AUTH", true);
      else commit("SET_AUTH", false);
    },
    async requestUser({commit}) {
      await axios.get(`user/me`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
      })
        .then(response => {
          if (response.data.roles.some(role => role.value === 'ADMIN')) {
            commit("SET_TYPE", "ADMIN")
              localStorage.setItem("type", "ADMIN")
          } else if (response.data.roles.some(role => role.value === 'MANAGER')) {
            commit("SET_TYPE", "MANAGER")
              localStorage.setItem("type", "MANAGER")
          } else {
            commit("SET_TYPE", "USER")
              localStorage.setItem("type", "USER")
          }
              commit("SET_USER", response.data);
              commit("SET_AUTH", true);
          })

          .catch(error => {
              commit("SET_USER", {});
              commit("SET_AUTH", false);
              localStorage.removeItem("access_token");
              localStorage.removeItem("type");
              // dispatch.checkAuth()
          })
    },    
    logoutUser({ commit }) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("type");
      commit("SET_USER", {});
      commit("SET_AUTH", false);
    },
  },
  modules: {
  }
})
