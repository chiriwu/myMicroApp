import React, { useEffect } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Button } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];

interface categoryItemType {
  style?: React.CSSProperties;
  setContentKey: (key: string) => void;
}
const CategoryItem: React.FC<categoryItemType> = ({ style, setContentKey }) => {
  const items: MenuItem[] = [
    {
      key: 'sub1',
      icon: <MailOutlined />,
      label: '待办',
      children: [
        { key: 'today', label: '今天' },
        { key: '7days', label: '七天内' },
      ],
    },
    {
      key: 'sub2',
      icon: <AppstoreOutlined />,
      label: '更多',
      children: [
        { key: '5', label: 'Option 5' },
        { key: '6', label: 'Option 6' },
      ],
    },
  ];

  const onClick: MenuProps['onClick'] = ({ item, key, keyPath, domEvent }) => {
    console.log('click ', item, key, keyPath, domEvent);
    setContentKey(key); // update content based on the selected key
    // your code here
  };
  const addProject = () => {
    console.log('addProject');
  };
  return (
    <div style={style}>
      <Menu onClick={onClick} mode="inline" items={items} defaultSelectedKeys={['today']} defaultOpenKeys={['sub1']} />
      <div style={{ marginTop: '16px', textAlign: 'left' }}>
        <Button type="primary" onClick={addProject}>
          新增项目
        </Button>
      </div>
    </div>
  );
};
export default CategoryItem;
