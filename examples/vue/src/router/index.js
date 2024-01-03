import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const files = require.context('@/router/modules', false, /\.js$/);
const routesModules = files.keys().reduce((acc, cur) => acc.concat(files(cur).default), []);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    redirect: '/home/base',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    redirect: '/home/base',
    meta: {
      number: 1,
      roleId: 0,
      title: '首页',
    },
    children: [
      {
        path: 'base',
        name: 'base',
        component: () => import('@/components/Base.vue'),
      },
      {
        path: 'website/:name',
        name: 'website',
        component: () => import('@/views/display/website.vue'),
      },
    ],
  },
  ...routesModules,
];

export default routes;
