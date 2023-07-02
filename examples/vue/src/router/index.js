import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Base from '@/components/Base.vue';
Vue.use(VueRouter);

const files = require.context('@/router/modules', false, /\.js$/);
const routesModules = files.keys().reduce((acc, cur) => acc.concat(files(cur).default), []);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      number: 1,
      isNav: true,
    },
    children: [
      {
        path: '/base',
        name: 'base',
        component: Base,
      },
    ],
  },
  ...routesModules,
];

export default routes;
