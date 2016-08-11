import React, { Component } from 'react';
import StartJam from './StartJam';

class SelectInstrument extends Component {

  render() {
    return (
      <div>Choose an Instrument!<br />
        <button onClick={() => { this.props.sel('piano')}}>Piano goes here</button>
        <button onClick={() => { this.props.sel('drums')}}>Drums go here</button>
        <StartJam change={this.props.change} inst={this.props.inst} />
      </div>
    );
  }
}

export default SelectInstrument;
