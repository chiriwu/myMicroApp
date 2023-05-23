import Vue from 'vue';
import Vuex from 'vuex';
import { getCookies, setCookies } from '@/utils/WithCookies.js'
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isAuthorized: false,
        token: getCookies()
    },
    mutations: {
        print: function() {
            console.log('token=', getCookies());
        }
    },
    actions: {
        setCookies,
    },
    modules: {},
});