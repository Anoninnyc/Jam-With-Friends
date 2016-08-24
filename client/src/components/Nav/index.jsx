import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import $ from "jquery";
import { Link } from 'react-router';
import NavMenuIcon from './NavMenuIcon';

const color={ backgroundImage: 'url("http://bit.ly/2b2ePzs")', width: "100%", opacity: 0.6 };

class AppNavBar extends Component {
  constructor(props, context) {
    super(props);
    this.logIn = this.props.logIn.bind(this);
    this.logOut = this.props.logOut.bind(this);
    this.clearSessions = this.clearSessions.bind(this);
    console.log("this.props.user", this.props.user);
  }

  componentDidMount() {
    // this get request will keep the user logged with their own instruments...
    $.get("/getUserInfo", (resp, err) => {
      // console.log('this the the resp to userloggedintomakeinst', resp);
      if (resp[0] === null) {
       // console.log('youre not logged in!');
      } else {
        this.logIn(resp[0], resp[1]);
      }
    });

    $.get("/fbLoggedIn?", (response, err) => {
      if (response !== "false") {
        console.log(response[0], typeof response[0], 'here!!!');
        this.logIn(response[0], response[1]);
      } else {
        console.log('not logged to fb');
      }
    });
  }

  clearSessions() {
    $.get("/logout", (resp, err) => {
      this.logOut();
    });
  }

  render() {
    // console.log('tpu', this.props.userInstruments);
    return (
      <div id="navBar">
        <AppBar
          style={color}
          showMenuIconButton={false}
        >
          <Link to="/">
            <img id="logo" src="http://bit.ly/2beSCQg" alt="logo" />
          </Link>
          <NavMenuIcon
            loggedIn={this.props.loggedIn}
            clearSessions={this.clearSessions}
          />
        </AppBar>
      </div>
    ); }
  }

AppNavBar.contextTypes = {
  router: React.PropTypes.object
};

AppNavBar.propTypes = {
  title: React.PropTypes.string,
  loggedIn: React.PropTypes.bool,
  user: React.PropTypes.string,
  logOut: React.PropTypes.func,
  logIn: React.PropTypes.func,
};

export default AppNavBar;
