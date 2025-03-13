import React, { useEffect, forwardRef, useState, useRef, HTMLElementType, useImperativeHandle } from 'react';
import { Checkbox, Popover, Input } from 'antd';
import type { CheckboxProps } from 'antd';
import TodoItemStyle from '../style/TodoItem.module.scss';
const { TextArea } = Input;

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
      inputRef.current?.focus();
    }, [isEditStatus]);
    useImperativeHandle(ref, () => ({
      focus: () => {
        setIsEditStatus(true);
      },
    }));
    const onTextChange = (e: any) => {
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
    };
    const exitInput = () => {
      setIsEditStatus(false);
      checkIfEmpty();
    };
    const deleteContent = () => {
      deleteCurItem();
      setOpen(false);
    };
    const OpenContent = () => {
      return <a onClick={deleteContent}>删除</a>;
    };
    return (
      <div style={style} className={TodoItemStyle.container}>
        <Checkbox
          onChange={onStautsChange}
          style={{ width: '36px', height: '36px', marginRight: '12px' }}
          checked={contentItem.status}
        ></Checkbox>
        {isEditStatus ? (
          <TextArea
            value={contentItem.text}
            ref={inputRef}
            onChange={onTextChange}
            onBlur={exitInput}
            style={{ fontSize: '28px', width: '100%' }}
            autoSize
          ></TextArea>
        ) : (
          <Popover
            content={OpenContent}
            title="操作"
            trigger="contextMenu"
            placement="top"
            open={open}
            onOpenChange={(open) => setOpen(open)}
          >
            <label onClick={() => setIsEditStatus(true)} style={{ marginLeft: '12px', lineHeight: '51px' }}>
              {contentItem.text}
            </label>
          </Popover>
        )}
      </div>
    );
  },
);
export default TodoItem;
