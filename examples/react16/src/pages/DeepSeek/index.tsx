import React, { useEffect } from 'react';
import { Button } from 'antd';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import axios from 'axios';
const DeepSeek: React.FC = () => {
  const sendMessage = () => {
    fetchEventSource('http://127.0.0.1:3000/api/chat/ask', {
      method: 'POST',
      body: JSON.stringify({
        chatId: '1231412',
        query: '写一篇医学论文，800字左右',
      }),
      headers: {
        'Content-Type': 'text/event-stream',
      },
      onmessage(ev) {
        console.log(ev.data);
      },
      onerror(e) {
        console.log('链接错误', e);
        throw e;
      },
    });
  };
  const sendotherMessage = () => {
    axios.get('http://127.0.0.1:3000/api/user/test').then((res) => {
      console.log('res', res);
    });
  };
  return (
    <>
      <h1>sjfosajfsoa</h1>
      <Button onClick={sendMessage}> send</Button>
      <Button onClick={sendotherMessage}> send</Button>
    </>
  );
};

export default DeepSeek;
