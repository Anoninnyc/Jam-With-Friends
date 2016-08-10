import React, { Component } from 'react';

class StartJam extends Component {

  render() {
    if (this.props.inst==='start'){
    return (
      <div>
      <button>Choose an instrument</button>
      </div>
    )
  } else {
    return (
        <div>
      <button>Start Jamming!</button>
      </div>
      )
  }
  }
}

export default StartJam;