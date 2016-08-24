import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import $ from "jquery";
import { Link } from 'react-router';
import NavMenuIcon from './NavMenuIcon';

const color={ backgroundImage: 'url("http://bit.ly/2b2ePzs")', width: "100%", opacity: 0.6 };

class AppNavBar extends Component {

  componentDidMount() {
    $.get("/fbLoggedIn?", (response, err) => {
      if (response !== "false") {
        this.logIn(response);
      }
    });
  }

  clearSessions() {
    $.get("/logout", (resp, err) => {
      this.props.logOut();
    });
  }

  render() {
    return (
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
    ); }
  }

AppNavBar.contextTypes = {
  router: React.PropTypes.object
};

AppNavBar.propTypes = {
  title: React.PropTypes.string.isRequired,
  loggedIn: React.PropTypes.bool.isRequired,
  user: React.PropTypes.string.isRequired,
  logOut: React.PropTypes.func.isRequired,
};

export default AppNavBar;
