import React, { useEffect, useState } from 'react';
import { Button, Input, message } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import axios from 'axios';
import styles from './index.module.css';

interface Message {
  content: string;
  type: 'user' | 'bot';
}

const DeepSeek: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const generateChatId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 15);
  };

  const sendInfo = () => {
    if (!inputValue.trim()) {
      message.warning('请先输入内容');
      return;
    }

    const newMessage: Message = {
      content: inputValue,
      type: 'user',
    };
    setMessages((prev) => [...prev, newMessage]);
    const chatId = generateChatId();
    setInputValue('');

    fetchEventSource('http://127.0.0.1:3000/api/chat/ask', {
      method: 'POST',
      body: JSON.stringify({
        chatId,
        query: inputValue,
      }),
      headers: {
        'Content-Type': 'text/event-stream',
      },
      onmessage(ev) {
        const botMessage: Message = {
          content: ev.data,
          type: 'bot',
        };
        setMessages((prev) => [...prev, botMessage]);
      },
      onerror(e) {
        console.log('链接错误', e);
        message.error('发送消息失败');
        throw e;
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatContainer}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.messageRow} ${msg.type === 'user' ? styles.userMessage : styles.botMessage}`}
          >
            {msg.type === 'bot' && <div className={styles.avatar}>AI</div>}
            <div className={styles.messageContent}>{msg.content}</div>
            {msg.type === 'user' && <div className={styles.avatar}>Me</div>}
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={sendInfo}
          placeholder="请输入内容..."
        />
        <Button type="primary" icon={<SendOutlined />} onClick={sendInfo}>
          发送
        </Button>
      </div>
    </div>
  );
};

export default DeepSeek;
