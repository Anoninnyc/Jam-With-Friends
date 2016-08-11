import React, { Component } from 'react';
import Piano from './Piano';

class UserInstrument extends Component {

  render() {
    if (this.props.inst==="piano") {
      console.log('you selected piano');
      return (
        <div>
          <Piano id="userPiano" />
        </div>
      );
    } else {
      return (
        <div>
          <img id="userDrums" src="../../../style/drums.png" />
        </div>
    );
    }
  }
}

export default UserInstrument;
