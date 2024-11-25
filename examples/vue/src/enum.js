export const NavArr = [
  {
    label: '首页',
    value: 'home',
    icon: 'el-icon-s-home',
    // children: [],
  },
  {
    label: '网站合集',
    value: 'website',
    icon: 'el-icon-s-data',
    children: [
      {
        label: 'AI工具',
        value: 'ai',
      },
      { label: '生活服务', value: 'life' },
      { label: 'AI人工智能', value: 'smart' },
      { label: '日常生活', value: 'daily' },
      { label: '娱乐生活', value: 'entertainment' },
      { label: '兴趣爱好', value: 'hobbies' },
      { label: '工具大全', value: 'tools' },
      { label: '软件下载', value: 'software' },
      { label: '发现资源', value: 'resource' },
      { label: '探索发现', value: 'explore' },
    ],
  },
];
export const roleId = {
  0: '访客',
  1: '开发者',
};
export const webSiteArr = NavArr[1].children;
