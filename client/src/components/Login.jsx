// Modules
import React, { Component } from 'react';
import { Link } from 'react-router';
//import $ from 'jquery';
import { showErrorMessage, paperStyle } from '../utils/helperFunctions';

// Material.UI
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      userName:null,
      passWord:null,
    };
    this.helperLogin = this.helperLogin.bind(this);  
  }

  FBAuth(e) {
    e.preventDefault();
    const linkTag = $('<a href="/auth/facebook"></a>');
    linkTag[0].click();
  }

  helperLogin(user,pass) {
    $.post("/login", { user, pass, }, (resp) => {
      if (typeof resp !=='string') {
        this.props.logIn(user, resp);
        this.context.router.push('/');
      } else {
        showErrorMessage("#LIMessages", 'Bad login', "badLogin");
      }
    });
  }


  handleChange(property,evt) {
    console.log("this", this);
    let target = evt.target.value;
    const newState  = {};
    newState[property] = target;
    this.setState(newState);
  }

  render() {
    return (
      <div id="loginContent">
        <Paper
          style={paperStyle}
          zDepth={3}
        >
          <div id="LIFields">
            <TextField onChange = {this.handleChange.bind(this,"userName")} floatingLabelText="UserName" hintText="Watch caps lock" /><br />
            <TextField onChange = {this.handleChange.bind(this,"passWord")} floatingLabelText="Password" hintText="Watch caps lock" type="password" /><br />
            <RaisedButton label="Login" onClick={() => { this.helperLogin(this.state.userName,this.state.passWord); }} / >
            <Link to="signup"><RaisedButton label="Click to signup" /></Link>
            <RaisedButton id="FBLogin" onClick={this.FBAuth} label="Login with Facebook" />
            <div id="LIMessages"><br /></div>
          </div>
        </Paper>
      </div>
    );
  }
}

Login.propTypes = {
  params: React.PropTypes.object,
  updateUserInstrument: React.PropTypes.func,
  logIn: React.PropTypes.func,
};

Login.contextTypes = {
  router: React.PropTypes.object
};

Login.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
export default Login;
