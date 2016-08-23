import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router';
import $ from 'jquery';
import { showErrorMessage } from '../utils/helperFunctions';

class Login extends Component {

  helperLogin() {
    const user=$('#UserNameLogin').val();
    const pass= $('#UserNamePass').val();
    $.post("/login", { user: user, pass: pass }, (resp) => {
    console.log(typeof resp, resp, 'resp!');
     if (typeof resp !=='string') {
        console.log(resp, this.props.updateUserInstrument);
        this.props.logIn(user, resp);
        this.context.router.push('/');
      } else {
        showErrorMessage("#LIMessages", 'Bad login', "badLogin");
      }
    });
  }

  render() {
    return (
      <div id="loginContent">
        <TextField floatingLabelText="UserName" hintText="Watch caps lock" id="UserNameLogin" /><br />
        <TextField floatingLabelText="Password" hintText="Watch caps lock" id="UserNamePass" type="password" /><br />
        <RaisedButton label="Login" onClick={() => { this.helperLogin(); }} / >
        <Link to="signup"><RaisedButton label="Click to signup" /></Link>
        <div id="LIMessages"><br /> </div>

      </div>
    );
  }
}

Login.propTypes = {
  params: React.PropTypes.object
};

Login.contextTypes = {
  router: React.PropTypes.object
};

Login.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
export default Login;
