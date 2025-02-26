import React, { useEffect } from 'react';
import CategoryItem from './components/CategoryItem';
import TodoContent from './components/TodoContent';

const containerStyle = {
  display: 'flex',
  flexDirection: 'row' as 'row', // 奇怪的写法，不然报错属性“flexDirection”的类型不兼容。不能将类型“string”分配给类型“FlexDirection | undefined”。
  justifyContent: 'flex-start',
  alignItem: 'center',
  margin: '12px',
};
const TodoList = () => {
  const [localContent, setContent] = React.useState<
    {
      text: string;
      status: boolean;
    }[]
  >([]);
  const defaultKey = '7days';
  useEffect(() => {
    const content = localStorage.getItem(defaultKey) && JSON.parse(localStorage.getItem(defaultKey) || '[]');
    setContent(content || []);
  }, []);
  return (
    <div style={containerStyle}>
      <CategoryItem style={{ width: '200px' }}></CategoryItem>
      <TodoContent
        setContent={setContent}
        localContent={localContent}
        style={{ flex: 1, marginLeft: '24px' }}
      ></TodoContent>
    </div>
  );
};
export default TodoList;
