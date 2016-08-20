import React, { Component } from 'react';
import { Transport } from 'tone';
import Sequence from './Sequence';
import PlayStopButton from './PlayStopButton';

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
    let isPlaying = this.state.isPlaying;

    this.setState({
      isPlaying: !isPlaying
    });

    isPlaying = this.state.isPlaying;

    console.log('after setting state:', isPlaying);
    console.log('Transport state', Transport.state);

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
        <Sequence isPlaying={this.state.isPlaying} />
      </div>
    );
  }
}

export default BeatSequencer;
