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
    if (copyLocalContent.length && copyLocalContent[copyLocalContent.length - 1]?.text === '' && refs.current) {
      refs.current[copyLocalContent.length - 1]?.focus();
    }
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
  const checkIfEmpty = () => {
    console.log('isEmpty');
    copyLocalContent.forEach((item, index) => {
      if (item.text === '') {
        copyLocalContent.splice(index, 1);
      }
    });
    setContent([...copyLocalContent]);
  };
  const deleteCurItem = (index: number) => {
    copyLocalContent.splice(index, 1);
    setContent([...copyLocalContent]);
  };
  return (
    <div style={style}>
      {localContent?.map((item, index) => {
        return (
          <TodoItem
            contentItem={item}
            setItemContent={setItemContent}
            checkIfEmpty={checkIfEmpty}
            deleteCurItem={() => deleteCurItem(index)}
            index={index}
            key={index}
            style={{
              minHeight: '36px',
              padding: '16px',
              fontSize: '28px',
              border: '1px solid #eee',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
            ref={(el: any) => (refs.current[index] = el)}
          ></TodoItem>
        );
      })}
      <Button type="primary" onClick={AddNewItem} style={{ marginTop: '16px', fontSize: '22px', height: 'auto' }}>
        新增
      </Button>
    </div>
  );
};
export default TodoContent;
