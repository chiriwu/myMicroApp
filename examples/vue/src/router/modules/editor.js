// import Editor from '@/views/editor';

export default [
  {
    path: '/editor',
    name: 'editor',
    component: () => import('@/views/editor'),
    meta: {
      title: '编辑器',
      number: 2,
      roleId: 1,
      hide: true,
    },
  },
];
