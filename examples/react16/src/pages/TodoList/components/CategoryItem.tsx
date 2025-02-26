import React, { useEffect } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Button } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];

interface categoryItemType {
  style?: React.CSSProperties;
}
const CategoryItem: React.FC<categoryItemType> = ({ style }) => {
  const items: MenuItem[] = [
    {
      key: 'sub1',
      icon: <MailOutlined />,
      label: 'Navigation One',
      children: [
        {
          key: '1-1',
          label: 'Item 1',
          type: 'group',
          children: [
            { key: '1', label: 'Option 1' },
            { key: '2', label: 'Option 2' },
          ],
        },
        {
          key: '1-2',
          label: 'Item 2',
          type: 'group',
          children: [
            { key: '3', label: 'Option 3' },
            { key: '4', label: 'Option 4' },
          ],
        },
      ],
    },
    {
      key: 'sub2',
      icon: <AppstoreOutlined />,
      label: 'Navigation Two',
      children: [
        { key: '5', label: 'Option 5' },
        { key: '6', label: 'Option 6' },
        {
          key: 'sub3',
          label: 'Submenu',
          children: [
            { key: '7', label: 'Option 7' },
            { key: '8', label: 'Option 8' },
          ],
        },
      ],
    },
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click', e);
  };

  return (
    <div style={style}>
      <Menu onClick={onClick} mode="inline" items={items} />
      <Button>新增项目</Button>
    </div>
  );
};
export default CategoryItem;
