import Login from '@/components/Login.vue';

export default [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      isNav: false,
    },
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
    meta: {
      number: 3,
      isNav: true,
    },
  },
];
