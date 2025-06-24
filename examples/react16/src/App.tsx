import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom';
// import loadable from './utils/loadable';
import loadable from '@loadable/component';

import './App.css';

// 公共模块
const DefaultLayout = loadable(() => import(/* webpackChunkName: 'default' */ './containers'));

const RouteExample = () => {
  return (
    <Router basename={window.__POWERED_BY_QIANKUN__ ? '/react16' : '/'}>
      <Suspense fallback={null}>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/index"></Redirect>}></Route>
          <Route component={DefaultLayout} />
        </Switch>
      </Suspense>
    </Router>
  );
};
export default function App() {
  return (
    <div className="app-main">
      <RouteExample />
    </div>
  );
}
