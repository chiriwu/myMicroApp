import Vue from 'vue';
import Vuex from 'vuex';
import { getCookies, setCookies, clearCookies } from '@/utils/WithCookies.js';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthorized: false,
    token: '',
    noNav: true,
    roleId: 0,
  },
  mutations: {
    print: function (state) {
      console.log('token=', state.token);
    },
    setNav: (state, v) => {
      state.noNav = v;
    },
    getToken: function (state) {
      const token = getCookies();
      if (token) state.token = token;
      return token;
    },
  },
  actions: {
    setCookies: ({ state }, roleId) => {
      setCookies();
      state.token = getCookies();
      state.roleId = roleId;
    },
    clearCookies: ({ state }, roleId) => {
      clearCookies();
      state.token = getCookies();
      state.roleId = roleId;
    },
  },
  modules: {},
});
