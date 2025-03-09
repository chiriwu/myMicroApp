import React, { useEffect, forwardRef, useState, useRef, HTMLElementType, useImperativeHandle } from 'react';
import { Checkbox, Popover } from 'antd';
import type { CheckboxProps } from 'antd';
import TodoItemStyle from '../style/TodoItem.module.scss';

interface TodoItemProps {
  style?: React.CSSProperties;
  contentItem: { text: string; status: boolean };
  index: number;
  setItemContent: (index: number, obj: { text: string; status: boolean }) => void;
  ref: any;
  checkIfEmpty: () => void;
  deleteCurItem: () => void;
}
const TodoItem: React.FC<TodoItemProps> = forwardRef(
  ({ style, index, contentItem, setItemContent, checkIfEmpty, deleteCurItem }, ref) => {
    const [isEditStatus, setIsEditStatus] = useState(false);
    const [open, setOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
      console.log('object');
      inputRef.current?.focus();
    }, [isEditStatus]);
    useImperativeHandle(ref, () => ({
      focus: () => {
        // inputRef.current?.focus();
        setIsEditStatus(true);
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
      checkIfEmpty();
    };
    const handleOpenChange = (open: boolean) => {
      setOpen(open);
    };
    const deleteContent = () => {
      deleteCurItem();
      setOpen(false);
    };
    const OpenContent = () => {
      return (
        <>
          <a onClick={deleteContent}>删除</a>
        </>
      );
    };
    return (
      <div style={style} className={TodoItemStyle.container}>
        <Checkbox
          onChange={onStautsChange}
          style={{ width: '36px', height: '36px', marginRight: '12px' }}
          checked={contentItem.status}
        ></Checkbox>
        {isEditStatus ? (
          <input
            value={contentItem.text}
            ref={inputRef}
            onChange={onTextChange}
            onBlur={exitInput}
            style={{ fontSize: '28px' }}
          ></input>
        ) : (
          <Popover
            content={OpenContent}
            title="操作"
            trigger="contextMenu"
            placement="top"
            open={open}
            onOpenChange={handleOpenChange}
          >
            <label onClick={() => setIsEditStatus(true)} style={{ marginLeft: '12px' }}>
              {contentItem.text}
            </label>
          </Popover>
        )}
      </div>
    );
  },
);
export default TodoItem;
