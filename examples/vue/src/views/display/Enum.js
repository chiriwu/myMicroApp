import { AISET } from './AI.js';
import moreWebsite from './moreWebsite.json';
const cateory = {
  life: {
    name: ' 生活服务',
    icon: 'el-icon-s-data',
  },
  smart: {
    name: ' AI人工智能',
    icon: 'el-icon-s-data',
  },
  daily: {
    name: ' 日常生活',
    icon: 'el-icon-s-data',
  },
  entertainment: {
    name: ' 娱乐生活',
    icon: 'el-icon-s-data',
  },
  hobbies: {
    name: ' 兴趣爱好',
    icon: 'el-icon-s-data',
  },
  tools: {
    name: ' 工具大全',
    icon: 'el-icon-s-data',
  },
  software: {
    name: ' 软件下载',
    icon: 'el-icon-s-data',
  },
  resource: {
    name: ' 发现资源',
    icon: 'el-icon-s-data',
  },
  explore: {
    name: ' 探索发现',
    icon: 'el-icon-s-data',
  },
};
let obj = {};
for (let item in cateory) {
  let children = [];
  for (let i in moreWebsite[cateory[item].name]) {
    children = [...children, ...moreWebsite[cateory[item].name][i]];
  }
  obj[item] = {
    label: cateory[item].name,
    value: item,
    icon: cateory[item].icon,
    children,
  };
}

// export const moreWebsiteSet = obj;
export const WEBSITEARRAY = {
  ai: {
    label: 'AI工具网站',
    value: 'fruit',
    icon: 'el-icon-s-data',
    children: AISET,
  },
  ...obj,
};
