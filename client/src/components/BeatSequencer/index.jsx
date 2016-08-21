import React, { Component } from 'react';
import { Transport } from 'tone';
import Sequence from './Sequence';
import PlayStopButton from './PlayStopButton';
import { membrane } from '../../instruments/sounds/tick';

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
      isPlaying: false
    };

    this.togglePlaying = this.togglePlaying.bind(this);
  }

  togglePlaying() {
    this.setState({
      isPlaying: !this.state.isPlaying
    });

    if (Transport.state !== 'started') {
      Transport.start();
    } else {
      Transport.stop();
    }
  }

  render() {
    return (
      <div className="beatSequencer">
        <PlayStopButton
          isPlaying={this.state.isPlaying}
          handleClick={this.togglePlaying}
        />
        <Sequence
          isPlaying={this.state.isPlaying}
          sound={{ tone: 'Bb4', def: membrane }}
        />
      </div>
    );
  }
}

export default BeatSequencer;
