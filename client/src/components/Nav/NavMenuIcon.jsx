import React from 'react';
import { Link } from 'react-router';
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
    <MenuItem primaryText="Login">
      <Link to="login" />
    </MenuItem>
    <MenuItem primaryText="Sign up">
      <Link to="signup" />
    </MenuItem>
  </IconMenu>
);

export default NavMenuIcon;
