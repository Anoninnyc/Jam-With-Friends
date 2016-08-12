import React from 'react';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const iconMenu = () => (
  <IconMenu
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem primaryText="Login" />
    <MenuItem primaryText="Sign up" />
    <MenuItem primaryText="Sign out" />
  </IconMenu>
);

const AppNavBar = () => (
  <AppBar
    title="Jam App"
    showMenuIconButton={false}
    iconElementRight={iconMenu()}
  />
);

export default AppNavBar;
