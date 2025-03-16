import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import CustomMenu from '../components/CustomMenu';

const { Sider } = Layout;

const AppAside = (props) => {
  let { menuToggle, menu } = props;
  return (
    <Sider className="aside" width={'200px'} collapsed={menuToggle}>
      <CustomMenu menu={menu}></CustomMenu>
    </Sider>
  );
};

AppAside.propTypes = {
  menuToggle: PropTypes.bool,
  menu: PropTypes.array.isRequired,
};

export default AppAside;
