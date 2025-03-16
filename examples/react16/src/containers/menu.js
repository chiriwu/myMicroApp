const menu = [
  {
    key: '/index',
    title: '首页',
    icon: 'home',
    auth: [1],
  },
  {
    title: '通用',
    key: '/public',
    icon: 'appstore',
    auth: [1],
    subs: [
      { title: '代办事项', key: '/public/todo-list', icon: '' },
      { title: '图标', key: '/public/icon', icon: '' },
    ],
  },
  {
    title: 'DeepSeek',
    key: '/DeepSeek',
    icon: 'appstore',
    auth: [1],
    subs: [{ title: '聊天', key: '/deepSeek/chat', icon: '' }],
  },
];

export default menu;
