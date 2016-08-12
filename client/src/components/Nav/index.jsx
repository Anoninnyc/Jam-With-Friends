import React from 'react';

import AppBar from 'material-ui/AppBar';
import NavIconMenu from './AppIconMenu';

const AppNavBar = ({ title }) => (
  <AppBar
    title={title}
    showMenuIconButton={false}
    iconElementRight={<NavIconMenu />}
  />
);

AppNavBar.propTypes = {
  title: React.PropTypes.string.isRequired
};

export default AppNavBar;
