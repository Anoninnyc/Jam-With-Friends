import React, { Component } from 'react';
import UserInstrument from './UserInstrument';

class JamRoom extends Component {

  render() {
    return (
      <div id="jamroom">
      <h1>Welcome to the JamRoom!</h1>
        <UserInstrument />
      </div>
    );
  }
}

export default JamRoom;
