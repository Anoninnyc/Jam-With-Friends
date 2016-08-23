import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { Link } from 'react-router';
import NavMenuIcon from './NavMenuIcon';
import $ from "jquery";

const color={ backgroundImage: 'url("http://bit.ly/2b2ePzs")', width: "100%", opacity: 0.6 };

class AppNavBar extends Component {

  componentDidMount() {
    $.get("/fbLoggedIn?", (response, err) => {
      console.log(response, 'response');
      if (response !== "false") {
        this.logIn(response);
      }
    });
  }

  clearSessions() {
    console.log('youre trying to log out ');
    $.get("/logout", (a, b) => {
      console.log("this is a and b", a, b);
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
          <NavMenuIcon
            logout={this.props.logout}
          />
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
  logout: React.PropTypes.func.isRequired,
};

export default AppNavBar;

 // {this.props.user.length?<div id="Welcome"> Hello {this.props.user}!</div>:null}
 //          <Link to="/"><img id="logo" src="http://bit.ly/2beSCQg" /></Link>
 //          {this.props.loggedIn?null:<a href="/auth/facebook"><button onClick={() => {this.logIn("FACEBOOK USER"); }} className="navButtons"> Login with FB!</button></a>}
 //          {this.props.loggedIn?null:<Link to="login" ><button className="navButtons"> Login!</button></Link>}
 //          {!this.props.loggedIn?null:<Link to="MakeInstrument"><button className="navButtons"> Make your own instrument!</button></Link>}
 //          {!this.props.loggedIn?null:<Link to="/"><button onClick={() => { this.logOut(); }} className="navButtons"> SignOut!</button></Link>}
 //          {this.props.loggedIn?null:<Link to="signup"><button className="navButtons"> Signup!</button></Link>}
