import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import routes from '../routes';
import { menuToggleAction } from '../store/actionCreators';
import menu from './menu';
import '../style/layout.scss';

import AppHeader from './AppHeader.jsx';
import AppAside from './AppAside.jsx';
import AppFooter from './AppFooter.jsx';

const { Content } = Layout;

class DefaultLayout extends Component {
  state = {
    menu: [],
  };
  componentDidMount() {
    this.setState({
      menu,
    });
  }

  componentDidUpdate() {
    let { pathname } = this.props.location;
  }

  render() {
    let { menuClick, menuToggle } = this.props;
    return (
      <Layout className="app">
        <AppAside menuToggle={menuToggle} menu={this.state.menu} />
        <Layout style={{ minHeight: '100vh', marginLeft: '10px' }}>
          <Content className="content">
            <Switch>
              {routes.map((item) => {
                return (
                  <Route
                    key={item.path}
                    path={item.path}
                    exact={item.exact}
                    render={(props) => <item.component {...props} />}
                  ></Route>
                );
              })}
              <Redirect to="/404" />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const stateToProp = (state) => ({
  menuToggle: state.menuToggle,
});

const dispatchToProp = (dispatch) => ({
  menuClick() {
    dispatch(menuToggleAction());
  },
});

export default withRouter(connect(stateToProp, dispatchToProp)(DefaultLayout));
