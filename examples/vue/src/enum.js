export const NavArr = [
  {
    label: '首页',
    value: 'fruit0',
    icon: 'el-icon-s-data',
    children: [],
  },
  {
    label: '水果',
    value: 'website',
    icon: 'el-icon-s-data',
    children: [
      {
        label: '苹果',
        value: 'apple',
        children: [
          {
            label: '红富士',
            value: 'red_delicious',
          },
          {
            label: '青苹果',
            value: 'granny_smith',
          },
        ],
      },
      {
        label: '香蕉',
        value: 'banana',
        children: [
          {
            label: '甜香蕉',
            value: 'sweet_banana',
          },
          {
            label: '青香蕉',
            value: 'green_banana',
          },
        ],
      },
      {
        label: '橙子',
        value: 'base',
        children: [
          {
            label: '橙子A',
            value: 'orange_a',
          },
          {
            label: '橙子B',
            value: 'orange_b',
          },
        ],
      },
    ],
  },
  {
    label: '水果',
    value: 'fruit2',
    icon: 'el-icon-s-flag',
    children: [
      {
        label: '热带水果',
        value: 'tropical',
        children: [
          {
            label: '香蕉',
            value: 'banana',
          },
          {
            label: '菠萝',
            value: 'pineapple',
          },
          {
            label: '芒果',
            value: 'mango',
          },
        ],
      },
      {
        label: '浆果',
        value: 'berry',
        children: [
          {
            label: '草莓',
            value: 'strawberry',
          },
          {
            label: '蓝莓',
            value: 'blueberry',
          },
          {
            label: '覆盆子',
            value: 'raspberry',
          },
        ],
      },
      {
        label: '柑橘类',
        value: 'citrus',
        children: [
          {
            label: '橙子',
            value: 'orange',
          },
          {
            label: '柠檬',
            value: 'lemon',
          },
          {
            label: '柚子',
            value: 'grapefruit',
          },
        ],
      },
    ],
  },
];
