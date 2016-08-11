import React, { Component } from 'react';

class Nav extends Component {

  render() {
    return (
      <div>
        <button onClick={() => { this.props.change('login')}}>Login</button>
        <button onClick={() => { this.props.change('signup')}}>Signup</button>
      </div>
    );
  }
}

export default Nav;
