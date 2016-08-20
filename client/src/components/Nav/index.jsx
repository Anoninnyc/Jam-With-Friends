import AppBar from 'material-ui/AppBar';
import React from 'react';
import { Link } from 'react-router';
import NavMenuIcon from './NavMenuIcon';

const color={ backgroundImage: 'url("http://bit.ly/2b2ePzs")', width: "100%", opacity: 0.6 };

const AppNavBar = () => (
  <div id="navBar">
    <AppBar
      style={color}
      showMenuIconButton={false}
    >
      <Link to="/">
        <img id="logo" src="http://bit.ly/2beSCQg" alt="logo" />
      </Link>
      <NavMenuIcon />
    </AppBar>
  </div>
);

AppNavBar.propTypes = {
  title: React.PropTypes.string.isRequired
};

export default AppNavBar;
