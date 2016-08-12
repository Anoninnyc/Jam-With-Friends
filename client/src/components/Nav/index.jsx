import React from 'react';

import AppBar from 'material-ui/AppBar';
import NavIconMenu from './AppIconMenu';

const AppNavBar = () => (
  <AppBar
    title="Jam App"
    showMenuIconButton={false}
    iconElementRight={<NavIconMenu />}
  />
);

export default AppNavBar;
