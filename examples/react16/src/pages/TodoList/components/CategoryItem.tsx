import React, { useEffect, useState } from 'react';
import {
  AppstoreOutlined,
  MailOutlined,
  DownloadOutlined,
  DeleteOutlined,
  UploadOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import type { MenuProps, UploadProps } from 'antd';
import { Menu, Button, Modal, Input, message, Tooltip, Popconfirm, Upload } from 'antd';
import CategoryStyle from '../style/CategoryItem.module.scss';
type MenuItem = Required<MenuProps>['items'][number];
console.log('CategoryStyle=', CategoryStyle);
console.log('sdfsf=', CategoryStyle['operation-btn']);
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
  selectedKeys: string;
  LabelKeyList: { key: string; label: string }[];
  saveLabelKeyList: (arr: { key: string; label: string }[]) => void;
  downLoadLocal: () => void;
  importData: (str: string) => void;
  deleteCurKey: () => void;
}
const CategoryItem: React.FC<categoryItemType> = ({
  style,
  setContentKey,
  selectedKeys,
  LabelKeyList,
  saveLabelKeyList,
  downLoadLocal,
  importData,
  deleteCurKey,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [openKey, setOpenKey] = useState(['sub1']);
  const [items, setItem] = useState<MenuItem[]>([]);

  useEffect(() => {
    (initItems[1] as any).children = LabelKeyList;
    setItem(initItems);
  }, [LabelKeyList]);

  const onClick: MenuProps['onClick'] = ({ key }) => {
    setContentKey(key); // update content based on the selected key
  };
  const addProject = () => {
    if (!projectName) {
      message.warning('请输入分组名称');
    }
    const key = +new Date() + 'ABCDEFGabcdefg'.charAt(Math.floor(13 * Math.random()));
    const newItems = [...items];
    (newItems[1] as any).children?.push({ key, label: projectName });
    setItem([...newItems]);
    saveLabelKeyList([...(newItems[1] as any).children]);
    setOpenKey(['sub1', 'sub2']);
    setModalOpen(false);
  };

  const importUploadProps: UploadProps = {
    beforeUpload(file: any, fileList: any) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
          importData(reader.result as string);
        };
      });
    },
  };

  return (
    <div style={style}>
      <Menu
        onClick={onClick}
        mode="inline"
        items={items}
        selectedKeys={[selectedKeys]}
        openKeys={openKey}
        onOpenChange={(key) => setOpenKey(key)}
      />
      <div className={CategoryStyle['operation-btn']}>
        <Tooltip title="新增项目">
          <PlusOutlined
            onClick={() => {
              setModalOpen(true);
              setProjectName('');
            }}
          />
        </Tooltip>

        <Tooltip title="下载到本地">
          <DownloadOutlined onClick={downLoadLocal} />
        </Tooltip>
        <Tooltip title="上传到云端">
          <Upload {...importUploadProps}>
            <UploadOutlined style={{ fontSize: '28px', color: 'white' }} />
          </Upload>
        </Tooltip>
        <Tooltip title="删除项目">
          <Popconfirm
            title={'删除当前项目'}
            description={'是否删除当前项目，删除前可以先下载到本地保存'}
            onConfirm={() => deleteCurKey()}
            okText="确认"
            cancelText="取消"
            placement="right"
          >
            <DeleteOutlined />
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
