import React, { lazy, Suspense, useState } from 'react';
// import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { Menu } from 'antd';
import { PlayCircleOutlined, CaretRightOutlined, StepForwardOutlined } from '@ant-design/icons';

// import 'antd/dist/antd.min.css';
import './App.css';
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
  const Component = lazy(() => import(`./pages/${current}`));

  return (
    <>
      <Menu style={{ width: '100%' }} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      <Suspense fallback={null}>
        <Component></Component>
      </Suspense>
    </>
    // <Router basename={window.__POWERED_BY_QIANKUN__ ? '/react16' : '/'}>
    //   {/* <nav>
    //     <Link to="/about"> About </Link> <Link to="/"> Home </Link> <Divider type="vertical" />
    //   </nav> */}
    //   <Suspense fallback={null}>
    //     <Switch>
    //       {/* <Route path="/" exact component={Home} />
    //       <Route path="/about" component={About} /> */}
    //       <Menu style={{ width: '100%' }} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    //       {/* <Component></Component> */}
    //       <Home></Home>
    //       <About></About>
    //     </Switch>
    //   </Suspense>
    // </Router>
  );
};

export default function App() {
  return (
    <div className="app-main">
      <RouteExample />
    </div>
  );
}
