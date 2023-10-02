import React, { useState } from 'react';
import { message } from 'antd';

export default function () {
  const [randomValue, setRandomValue] = useState('');
  const [NetdiskUrl, setNetdiskUrl] = useState('');
  const [password, setPassword] = useState('');

  function generatedRandomNumber() {
    return (Math.random() + '').slice(2);
  }

  function submit() {
    if (!randomValue || !NetdiskUrl || !password) {
      message.error('请填写完整');
    }
  }
  return (
    <>
      <label>
        发送码：{' '}
        <input
          value={randomValue}
          onChange={(e) => {
            setRandomValue(e.target.value);
          }}
        />{' '}
        <button onClick={() => setRandomValue(generatedRandomNumber())}> 重新生成 </button>{' '}
      </label>{' '}
      <label>
        网盘地址：{' '}
        <input
          value={NetdiskUrl}
          onChange={(e) => {
            setNetdiskUrl(e.target.value);
          }}
        />{' '}
      </label>{' '}
      <label>
        网盘密码：{' '}
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />{' '}
      </label>{' '}
      <button onClick={() => submit()}> 提交 </button>{' '}
    </>
  );
}
