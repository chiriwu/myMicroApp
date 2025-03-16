import loadable from '../utils/loadable';

const Index = loadable(() => import(/* webpackChunkName: 'index' */ '../pages/Media/index'));

// 通用
const TodoList = loadable(() => import(/* webpackChunkName: 'button' */ '../pages/TodoList/index'));

// DeepSeek
const DeepSeek = loadable(() => import(/* webpackChunkName: 'button' */ '../pages/DeepSeek/index'));

const routes = [
  { path: '/index', exact: true, name: 'Index', component: Index },
  { path: '/public/todo-list', exact: false, name: '代办事项', component: TodoList },
  { path: '/deepseek/chat', exact: false, name: 'deepseek', component: DeepSeek },

  //   { path: '/others/animation', exact: false, name: '动画', component: AnimationView, auth: [1] },
  //   { path: '/others/editor', exact: false, name: '富文本', component: EditorView, auth: [1] },
  //   { path: '/others/upload', exact: false, name: '上传', component: UploadView, auth: [1] },
  //   { path: '/one/two/three', exact: false, name: '三级', component: Three },
  //   { path: '/about', exact: false, name: '关于', component: About, auth: [1] },
];

export default routes;
