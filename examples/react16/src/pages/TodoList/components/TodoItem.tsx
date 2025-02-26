import React, { useEffect, forwardRef, useState, useRef, HTMLElementType, useImperativeHandle } from 'react';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
interface TodoItemProps {
  style?: React.CSSProperties;
  contentItem: { text: string; status: boolean };
  index: number;
  setItemContent: (index: number, obj: { text: string; status: boolean }) => void;
  ref: any;
}
const TodoItem: React.FC<TodoItemProps> = forwardRef(({ style, index, contentItem, setItemContent }, ref) => {
  const [isEditStatus, setIsEditStatus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    console.log('object');
    // inputRef.current?.focus();
  }, [isEditStatus]);
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
  }));
  const onTextChange = (e: any) => {
    console.log('e=', e.target.value);
    contentItem.text = e.target.value;
    setItemContent(index, {
      text: e.target.value,
      status: contentItem.status,
    });
  };
  const onStautsChange: CheckboxProps['onChange'] = (e) => {
    setItemContent(index, {
      text: contentItem.text,
      status: !contentItem.status,
    });
    console.log(`checked = ${e.target.checked}`);
  };
  const startInput = () => {
    inputRef.current?.focus();
  };
  const exitInput = () => {
    setIsEditStatus(false);
    // checkIfEmpty()
  };
  return (
    <div style={style}>
      <Checkbox
        onChange={onStautsChange}
        style={{ width: '24px', height: '24px' }}
        checked={contentItem.status}
      ></Checkbox>
      {isEditStatus ? (
        <input
          value={contentItem.text}
          ref={inputRef}
          onChange={onTextChange}
          onBlur={() => setIsEditStatus(false)}
        ></input>
      ) : (
        <label onClick={() => setIsEditStatus(true)} style={{ marginLeft: '12px' }}>
          {contentItem.text}
        </label>
      )}
    </div>
  );
});
export default TodoItem;
