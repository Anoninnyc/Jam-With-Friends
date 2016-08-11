import React, { Component } from 'react';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class Login extends Component {
  render() {
    return (
      <div>
        Username:<TextField  /><br />
        Password:<TextField type="password" /><br />
          <RaisedButton label="Login" onClick={() =>{this.props.change('SelectRoom')}} />
          <RaisedButton label= "Click to signup" onClick={() =>{this.props.change('SelectRoom')}} />
      </div>
    );
  }
}

Login.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
export default Login;
