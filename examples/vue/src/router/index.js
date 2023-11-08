import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Base from '@/components/Base.vue';
import Website from '@/views/display/website.vue';
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
      title: '首页',
    },
    children: [
      {
        path: 'base',
        name: 'base',
        component: Base,
      },
      {
        path: 'website/:name',
        name: 'website',
        component: Website,
      },
    ],
  },
  ...routesModules,
];

export default routes;
