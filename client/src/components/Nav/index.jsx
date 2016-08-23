import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import $ from "jquery";
import { Link } from 'react-router';
import NavMenuIcon from './NavMenuIcon';

const color={ backgroundImage: 'url("http://bit.ly/2b2ePzs")', width: "100%", opacity: 0.6 };

class AppNavBar extends Component {
  constructor(props, context) {
    super(props);
      this.logIn=this.props.logIn.bind(this);
      this.logOut=this.props.logOut.bind(this);
      console.log("this.props.user", this.props.user);
  }

  componentDidMount() {

     $.get("/userLoggedInToMakeInst", (resp, err) => {
      console.log('this the the resp to userloggedintomakeinst', resp);
      if (resp[0]==null) {
       console.log('youre not logged in!');
        //this.context.router.push("login");
      } else {
       // console.log('resp1,resp2', resp[0], resp[1]);
        this.logIn(resp[0], resp[1]);
      }
    });

    $.get("/fbLoggedIn?", (response, err) => {
      if (response !== "false") {
        console.log(response[0], typeof response[0], 'here!!!');
        this.logIn(response[0], response[1]);
      }
    });
  }

  // logOut() {

  // }
  clearSessions() {
    $.get("/logout", (resp, err) => {
      this.logOut();
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
          Hello: {this.props.user}
          <NavMenuIcon
          loggedIn={this.props.loggedIn}
          clearSessions={this.clearSessions.bind(this)}
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
  user: React.PropTypes.object,
  logout: React.PropTypes.func,
};

export default AppNavBar;

 // {this.props.user.length?<div id="Welcome"> Hello {this.props.user}!</div>:null}
 //          <Link to="/"><img id="logo" src="http://bit.ly/2beSCQg" /></Link>
 //          {this.props.loggedIn?null:<a href="/auth/facebook"><button onClick={() => {this.logIn("FACEBOOK USER"); }} className="navButtons"> Login with FB!</button></a>}
 //          {this.props.loggedIn?null:<Link to="login" ><button className="navButtons"> Login!</button></Link>}
 //          {!this.props.loggedIn?null:<Link to="MakeInstrument"><button className="navButtons"> Make your own instrument!</button></Link>}
 //          {!this.props.loggedIn?null:<Link to="/"><button onClick={() => { this.logOut(); }} className="navButtons"> SignOut!</button></Link>}
 //          {this.props.loggedIn?null:<Link to="signup"><button className="navButtons"> Signup!</button></Link>}
