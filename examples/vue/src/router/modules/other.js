export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/Login.vue'),
    meta: {
      isNav: false,
      isLoginPage: true,
      roleId: 0,
    },
  },
  {
    path: '/previewExcel',
    name: 'previewExcel',
    component: () => import(/* webpackChunkName: "previewExcel" */ '@/views/previewExcel'),
    meta: {
      title: '图表',
      number: 3,
      roleId: 1,
    },
  },
  {
    path: '/graph',
    name: 'graph',
    component: () => import(/* webpackChunkName: "graph" */ '@/views/graph'),
    meta: {
      title: '流程图',
      number: 4,
      roleId: 1,
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
      number: 5,
      roleId: 1,
    },
  },
];
