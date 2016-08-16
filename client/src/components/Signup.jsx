import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class Signup extends Component {

  render() {
    return (
      <div>
        Username:<TextField type="text" /><br />
        Password:<TextField type="password" /><br />
        <RaisedButton label="Signup" onClick={() => { this.props.change('selectInstrument')}} />
        <RaisedButton label="Click to Login Instead" onClick={() => { this.props.change('login')}} />
      </div>
    );
  }
}

Signup.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default Signup;
