import React, { Component } from 'react';

class userInstrument extends Component {

  render() {
 if (this.props.inst==="piano") {
    return (
      <div>
      <img id='userPiano' src="http://bit.ly/2aTy5ik"/>
      </div>
    );
   } else {
   	return (
      <div>
      <img id='userDrums' src="../../../style/drums.png"/>
      </div>
    );
   }
  }
}

export default userInstrument;
