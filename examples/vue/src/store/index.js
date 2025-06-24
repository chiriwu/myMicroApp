import Vue from 'vue';
import Vuex from 'vuex';
import { getCookies, setCookies, clearCookies } from '@/utils/WithCookies.js';
import { ROLE_LIST } from '@/constant';

Vue.use(Vuex);
console.log('ROLE_LIST=', ROLE_LIST);
export default new Vuex.Store({
  state: {
    isAuthorized: false,
    token: '',
    noNav: true,
    roleId: ROLE_LIST.TOURIST,
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
    getRoleId: function (state) {
      if (getCookies()) state.roleId = ROLE_LIST.NORMAL;
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
