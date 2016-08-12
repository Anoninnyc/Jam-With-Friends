import React from 'react';

import AppBar from 'material-ui/AppBar';
import NavMenuIcon from './NavMenuIcon';

const AppNavBar = ({ title }) => (
  <AppBar
    title={title}
    showMenuIconButton={false}
    iconElementRight={<NavMenuIcon />}
  />
);

AppNavBar.propTypes = {
  title: React.PropTypes.string.isRequired
};

export default AppNavBar;
