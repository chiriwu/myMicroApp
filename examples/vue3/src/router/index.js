// import { createRouter, createWebHashHistory } from 'vue-router';

const files = require.context('@/router/modules', false, /\.js$/);
const routesModules = files.keys().reduce((acc, cur) => acc.concat(files(cur).default), []);

const routes = [
  {
    path: '/',
    name: 'homePage',
    redirect: '/home',
  },
  ...routesModules,
];

// const router = createRouter({
//   history: createWebHashHistory(),
//   routes,
// });

export default routes;
