import React from 'react';
import { Link } from 'react-router';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

// How to wrap `MenuItem` components inside of `Link` components without warnings?
// https://github.com/callemall/material-ui/issues/4899
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
    <MenuItem
      primaryText="Login"
      containerElement={<Link to="/login" />}
    />
    <MenuItem
      primaryText="Sign up"
      containerElement={<Link to="/signup" />}
    />
    <MenuItem
      primaryText="Make your own instrument!"
      containerElement={<Link to="/MakeInstrument" />}
    />
  </IconMenu>
);

export default NavMenuIcon;
