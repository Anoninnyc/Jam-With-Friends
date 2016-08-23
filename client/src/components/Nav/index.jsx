import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { Link } from 'react-router';
import $ from "jquery";

const color={ backgroundImage: 'url("http://bit.ly/2b2ePzs")', width: "100%", opacity: 0.6 };

class AppNavBar extends Component {
  constructor(props, context) {
    super(props);
    context.router;
   // console.log("this.props.user", this.props.user);
  }

  componentDidMount() {
    $.get("/fbLoggedIn?", (response, err) => {
     // console.log(response);
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
          {this.props.user.length?<div id="Welcome"> Hello {this.props.user}!</div>:null}
          <Link to="/"><img id="logo" src="http://bit.ly/2beSCQg" /></Link>
          {this.props.loggedIn?null:<a href="/auth/facebook"><button onClick={() => {this.logIn("FACEBOOK USER"); }} className="navButtons"> Login with FB!</button></a>}
          {this.props.loggedIn?null:<Link to="login" ><button className="navButtons"> Login!</button></Link>}
          {!this.props.loggedIn?null:<Link to="MakeInstrument"><button className="navButtons"> Make your own instrument!</button></Link>}
          {!this.props.loggedIn?null:<Link to="/"><button onClick={() => { this.logOut(); }} className="navButtons"> SignOut!</button></Link>}
          {this.props.loggedIn?null:<Link to="signup"><button className="navButtons"> Signup!</button></Link>}
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
  user: React.PropTypes.string.isRequired
};

export default AppNavBar;
