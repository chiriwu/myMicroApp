import React, { useEffect } from 'react';
import CategoryItem from './components/CategoryItem';
import TodoContent from './components/TodoContent';

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
  return (
    <div style={containerStyle}>
      <CategoryItem
        style={{ width: '200px', borderRight: '3px solid #eee', height: '100%' }}
        defaultKey={defaultKey}
        setContentKey={setContentKey}
        defaultLabelKeyList={defaultLabelKeyList}
        setLabelKeyList={setLabelKeyList}
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
