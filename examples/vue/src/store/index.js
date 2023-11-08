import Vue from 'vue';
import Vuex from 'vuex';
import { getCookies, setCookies } from '@/utils/WithCookies.js';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthorized: false,
    token: '',
    noNav: true,
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
    setCookies: ({ state }, name) => {
      setCookies();
      state.token = getCookies();
    },
  },
  modules: {},
});
