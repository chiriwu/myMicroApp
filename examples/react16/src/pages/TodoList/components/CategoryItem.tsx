import React, { useEffect, useState } from 'react';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  DownloadOutlined,
  DeleteOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import type { MenuProps, UploadProps } from 'antd';
import { Menu, Button, Modal, Input, message, Tooltip, Popconfirm, Upload } from 'antd';
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
  defaultLabelKeyList: { key: string; label: string }[];
  setLabelKeyList: (arr: { key: string; label: string }[]) => void;
  downLoadLocal: () => void;
  importData: (str: string) => void;
}
const CategoryItem: React.FC<categoryItemType> = ({
  style,
  setContentKey,
  defaultKey,
  defaultLabelKeyList,
  setLabelKeyList,
  downLoadLocal,
  importData,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [openKey, setOpenKey] = useState(['sub1']);
  const [items, setItem] = useState<MenuItem[]>([]);
  useEffect(() => {
    (initItems[1] as any).children = defaultLabelKeyList;
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
    setLabelKeyList([...(newItems[1] as any).children]);
    setOpenKey(['sub1', 'sub2']);
    setModalOpen(false);
  };
  const onOpenChange: MenuProps['onOpenChange'] = (key) => {
    console.log('openkey', key);
    setOpenKey(key);
  };
  const importUploadProps: UploadProps = {
    beforeUpload(file: any, fileList: any) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
          importData(reader.result as string);
          console.log('reader.result=', reader.result);
          console.log('reader.result=', JSON.parse(reader.result as string));
        };
      });
    },
  };

  const confirm = (e: any) => {
    // console.log(e);
    // message.success('Click on Yes');
  };

  const deleteProject = () => {};

  return (
    <div style={style}>
      <Menu
        onClick={onClick}
        mode="inline"
        items={items}
        defaultSelectedKeys={[defaultKey]}
        openKeys={openKey}
        onOpenChange={onOpenChange}
      />
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
      <div
        style={{
          textAlign: 'left',
          fontSize: '28px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          backgroundColor: '#eee',
          padding: '12px',
          borderRadius: '8px',
        }}
      >
        <Tooltip title="下载到本地">
          <DownloadOutlined onClick={downLoadLocal} />
        </Tooltip>
        <Tooltip title="上传到云端">
          <Upload {...importUploadProps}>
            <UploadOutlined />
          </Upload>
        </Tooltip>
        <Tooltip title="删除项目">
          <Popconfirm
            title={'删除当前项目'}
            description={<Button>TR</Button>}
            onConfirm={confirm}
            okText="确认"
            cancelText="取消"
            placement="right"
          >
            <DeleteOutlined onClick={deleteProject} />
          </Popconfirm>
        </Tooltip>
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
