import React, { Component } from 'react';

class Signup extends Component {

  render() {
    return (
      <div>
        Username:<input type="text" /><br />
        Pass:<input type="password" /><br />
        <button onClick={() => { this.props.change('selectInstrument')}}>Signup</button>
        <button onClick={() => { this.props.change('login')}}>Click to Login Instead</button>
      </div>
    );
  }
}

export default Signup;
