import React from 'react';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

// Extra options, as dots on RH-side
const NavMenuIcon = () => (
  <IconMenu
    iconButtonElement={
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem primaryText="Login" />
    <MenuItem primaryText="Sign up" />
    <MenuItem primaryText="Sign out" />
  </IconMenu>
);

export default NavMenuIcon;
