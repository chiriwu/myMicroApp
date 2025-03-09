import React, { useEffect, useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Button, Modal, Input, message } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];

const initItems: MenuItem[] = [
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
    children: [],
  },
];

interface categoryItemType {
  style?: React.CSSProperties;
  setContentKey: (key: string) => void;
  defaultKey: string;
}
const CategoryItem: React.FC<categoryItemType> = ({ style, setContentKey, defaultKey }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [openKey, setOpenKey] = useState(['sub1']);
  const [items, setItem] = useState<MenuItem[]>([]);
  useEffect(() => {
    setItem(initItems);
  }, []);

  const onClick: MenuProps['onClick'] = ({ item, key, keyPath, domEvent }) => {
    console.log('click ', item, key, keyPath, domEvent);
    setContentKey(key); // update content based on the selected key
    // your code here
  };
  const addProject = () => {
    if (!projectName) {
      message.warning('请输入分组名称');
    }
    const key = +new Date() + 'ABCDEFGabcdefg'.charAt(Math.floor(13 * Math.random()));
    const newItems = [...items];
    (newItems[1] as any).children?.push({ key, label: projectName });
    console.log('newItem=', newItems);
    setItem([...newItems]);
    setOpenKey(['sub1', 'sub2']);
    setModalOpen(false);
  };
  return (
    <div style={style}>
      <Menu onClick={onClick} mode="inline" items={items} defaultSelectedKeys={[defaultKey]} openKeys={openKey} />
      <div style={{ marginTop: '16px', textAlign: 'left', fontSize: '28px' }}>
        <Button
          type="primary"
          style={{ fontSize: '22px', height: 'auto' }}
          onClick={() => {
            setModalOpen(true);
            setProjectName('');
          }}
        >
          新增项目
        </Button>
      </div>
      {modalOpen && (
        <Modal
          title="新增分组"
          centered
          open={modalOpen}
          onOk={() => addProject()}
          onCancel={() => setModalOpen(false)}
          okText={'确认'}
          cancelText={'取消'}
        >
          <Input
            placeholder="请输入分组名称"
            onChange={(e) => setProjectName(e.target.value)}
            value={projectName}
            style={{ margin: '20px 8px' }}
          />
        </Modal>
      )}
    </div>
  );
};
export default CategoryItem;
