import React, { useEffect } from 'react';
import CategoryItem from './components/CategoryItem';
import TodoContent from './components/TodoContent';
import { message } from 'antd';

const containerStyle = {
  display: 'flex',
  flexDirection: 'row' as 'row', // 奇怪的写法，不然报错属性“flexDirection”的类型不兼容。不能将类型“string”分配给类型“FlexDirection | undefined”。
  justifyContent: 'flex-start',
  alignItem: 'center',
  margin: '12px',
  fontSize: '28px',
};
const defaultKey = 'today';
const uniqueKey = 'TodoItem_erf5gvf_lku0xsc';
const labelKey = 'TodoItem_labelKey';

const TodoList = () => {
  const [localContent, setContent] = React.useState<
    {
      text: string;
      status: boolean;
    }[]
  >([]);

  const [contentKey, setContentKey] = React.useState<string>(defaultKey);
  const defaultLabelKeyList = JSON.parse(localStorage.getItem(uniqueKey) || '{}')?.[labelKey as any] || [];
  useEffect(() => {
    const uniqueData = localStorage.getItem(uniqueKey);
    const contentData = JSON.parse(uniqueData || '{}');
    console.log('object', uniqueData, contentData);
    setContent(contentData[contentKey] || []);
    // const content = localStorage.getItem(contentKey) && JSON.parse(localStorage.getItem(contentKey) || '[]');
    // setContent(content || []);
  }, [contentKey]);
  useEffect(() => {
    let newContent = JSON.parse(localStorage.getItem(uniqueKey) || '{}');
    newContent[contentKey] = localContent;
    localStorage.setItem(uniqueKey, JSON.stringify(newContent));
  }, [localContent]);
  const setLabelKeyList = (arr: any) => {
    let newContent = JSON.parse(localStorage.getItem(uniqueKey) || '{}');
    newContent[labelKey] = arr;
    localStorage.setItem(uniqueKey, JSON.stringify(newContent));
  };
  const importData = (str: string) => {
    console.log('sfdsaf=', str);
    localStorage.setItem(uniqueKey, str);

    const uniqueData = localStorage.getItem(uniqueKey);
    const contentData = JSON.parse(uniqueData || '{}');
    console.log('object', uniqueData, contentData);
    setContent(contentData[contentKey] || []);
  };
  const downLoadLocal = () => {
    // 将变量序列化为JSON字符串
    const jsonString = localStorage.getItem(uniqueKey) || '{}';
    // 创建一个Blob对象
    const blob = new Blob([jsonString], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    // 设置下载属性
    link.href = url;
    link.download = 'data.json';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  const deleteCurKey = () => {
    if (['today', '7days'].includes(contentKey)) {
      return message.warning('当前项目不能删除');
    }
    let newContent = JSON.parse(localStorage.getItem(uniqueKey) || '{}');
    const keyIndex = newContent[labelKey].findIndex((item: any) => item.key === contentKey);
    console.log('keyIndex', keyIndex);
    if (keyIndex !== -1) {
      delete newContent[contentKey];
      console.log('labelKey', newContent);
      newContent[labelKey].splice(keyIndex, 1);
      console.log('labelKey1', newContent);
      localStorage.setItem(uniqueKey, JSON.stringify(newContent));
      setContentKey(defaultKey);
    }
  };
  return (
    <div style={containerStyle}>
      <CategoryItem
        style={{ width: '200px', borderRight: '3px solid #eee', height: '100%' }}
        defaultKey={defaultKey}
        setContentKey={setContentKey}
        defaultLabelKeyList={defaultLabelKeyList}
        setLabelKeyList={setLabelKeyList}
        downLoadLocal={downLoadLocal}
        importData={importData}
        deleteCurKey={deleteCurKey}
      ></CategoryItem>
      <TodoContent
        setContent={setContent}
        localContent={localContent}
        style={{ flex: 1, marginLeft: '24px' }}
      ></TodoContent>
    </div>
  );
};
export default TodoList;
