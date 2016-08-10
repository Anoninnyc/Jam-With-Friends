import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div>
        Username:<input type="text" /><br />
        Pass:<input type="password" /><br />
          <button onClick={() =>{this.props.change('selectInstrument')}}>Login</button>
          <button onClick={() =>{this.props.change('signup')}}>Click to signup</button>
      </div>
    );
  }
}

export default Login;
