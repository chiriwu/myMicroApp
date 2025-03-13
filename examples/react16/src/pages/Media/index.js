import React, { lazy, Suspense, useState } from 'react';
// import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { Menu } from 'antd';
import { PlayCircleOutlined, CaretRightOutlined, StepForwardOutlined } from '@ant-design/icons';

// import 'antd/dist/antd.min.css';
// import '../App.css';
const items = [
  {
    label: '直播',
    key: 'Live',
    icon: <PlayCircleOutlined />,
  },
  {
    label: '视频',
    key: 'Video',
    icon: <CaretRightOutlined />,
  },
  {
    label: '音乐',
    key: 'Music',
    icon: <StepForwardOutlined />,
  },
];

const RouteExample = () => {
  const [current, setCurrent] = useState(items[0].key);
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  const Component = lazy(() => import(`./${current}`));

  return (
    <>
      <Menu
        style={{ width: '100%', borderRadius: '5px' }}
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      <Suspense fallback={null}>
        <Component></Component>
      </Suspense>
    </>
  );
};

export default function Media() {
  return (
    <div className="media-main">
      <RouteExample />
    </div>
  );
}
