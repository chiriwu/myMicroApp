import React from 'react';
import { Button, Form, Input } from 'antd';
// const [form] = Form.useForm();
import request from '../request';

const NetdiskUrl = '/add';
function submit(datas) {
  request.post(NetdiskUrl, datas).then((res) => {
    console.log('res=', res);
  });
}
const onFinish = (values) => {
  console.log('Success:', values);
  const datas = {
    code: values.Randomcode,
    name: values.name,
    content: values.content,
    url: values.NetdiskUrl,
    password: values.password,
  };
  submit(datas);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const App = () => (
  <>
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 800,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="发送码："
        name="Randomcode"
        rules={[
          {
            required: true,
            message: '请输入发送码!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="名称："
        name="name"
        rules={[
          {
            required: true,
            message: '请输入剧名/电影名!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="描述信息：" name="content">
        <Input />
      </Form.Item>
      <Form.Item
        label="网盘地址："
        name="NetdiskUrl"
        rules={[
          {
            required: true,
            message: '请输入网盘地址!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="网盘密码："
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </>
);
export default App;
