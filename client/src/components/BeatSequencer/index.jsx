import React, { Component } from 'react';
import Sequence from './Sequence';

/**
 * logic of:
 * - changing BPM
 * - beat grouping
 * - pass sounds to sequence
 */
class BeatSequencer extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }
  render() {
    return (
      <div className="beatSequencer">
        <Sequence />
      </div>
    );
  }
};

export default BeatSequencer;
