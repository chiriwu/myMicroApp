import React, { useEffect, useState, useRef } from 'react';
import { Button } from 'antd';
import TodoItem from './TodoItem';
interface TodoContentProps {
  style?: React.CSSProperties;
  localContent: {
    text: string;
    status: boolean;
  }[];
  setContent: Function;
}
const TodoContent: React.FC<TodoContentProps> = ({ style, localContent, setContent }) => {
  // const [content, setContent] = useState<
  //   {
  //     text: string;
  //     status: boolean;
  //   }[]
  // >([]);
  // useEffect(() => {
  //   // const localContent = localStorage.getItem('list')
  //   const localContent = [
  //     {
  //       text: '加入',
  //       status: false,
  //     },
  //   ];
  //   setContent(localContent);
  // }, []);
  const refs = useRef<HTMLInputElement[]>([]);
  let copyLocalContent: {
    text: string;
    status: boolean;
  }[] = [];
  useEffect(() => {
    copyLocalContent = localContent;
  }, [localContent]);
  const setItemContent = (
    index: number,
    obj: {
      text: string;
      status: boolean;
    },
  ) => {
    copyLocalContent[index] = obj;
    setContent([...copyLocalContent]);
  };
  const AddNewItem = () => {
    setContent([...copyLocalContent, { text: '', status: false }]);
    console.log('content', copyLocalContent);
    console.log('refs', refs);
    console.log('ref=', refs.current.length);
    // refs.current[refs.current.length - 1].focus();
  };
  return (
    <div style={style}>
      {localContent.map((item, index) => {
        return (
          <TodoItem
            contentItem={item}
            setItemContent={setItemContent}
            index={index}
            key={index}
            style={{ height: '24px' }}
            ref={(el: any) => (refs.current[index] = el)}
          ></TodoItem>
        );
      })}
      <Button type="primary" onClick={AddNewItem} style={{ marginTop: '16px' }}>
        新增
      </Button>
    </div>
  );
};
export default TodoContent;
