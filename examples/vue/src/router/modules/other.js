export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/Login.vue'),
    meta: {
      isNav: false,
    },
  },
  {
    path: '/previewExcel',
    name: 'previewExcel',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/previewExcel'),
    meta: {
      title: '图表',
      number: 3,
      isNav: true,
    },
  },
  {
    path: '/graph',
    name: 'graph',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/graph'),
    meta: {
      title: '流程图',
      number: 4,
      isNav: true,
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
      isNav: true,
    },
  },
];
