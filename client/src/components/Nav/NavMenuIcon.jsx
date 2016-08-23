import React from 'react';
import { Link } from 'react-router';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

// How to wrap `MenuItem` components inside of `Link` components without warnings?
// https://github.com/callemall/material-ui/issues/4899
const NavMenuIcon = (props) => (
  <IconMenu
    iconButtonElement={
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    {!props.loggedIn?<MenuItem
      primaryText="Login"
      containerElement={<Link to="/login" />}
    />:null}
    {!props.loggedIn?<MenuItem
      primaryText="Sign up"
      containerElement={<Link to="/signup" />}
    />:null}
    {!props.loggedIn?<a href="/auth/facebook"><MenuItem
      primaryText="LI with facebook!"
    /></a>:null}
    {props.loggedIn?<MenuItem
      onClick={props.clearSessions}
      primaryText="Signout!"
      containerElement={<Link to="/" />}
    />:null}
  </IconMenu>
);

export default NavMenuIcon;
