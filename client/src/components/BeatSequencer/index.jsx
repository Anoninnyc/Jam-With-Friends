import React, { Component } from 'react';
import Sequence from './Sequence';
import PlayStopButton from './PlayStopButton'

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
    const isPlaying = this.state.isPlaying;

    this.setState({
      isPlaying: !isPlaying
    });
  }

  render() {
    return (
      <div className="beatSequencer">
        <PlayStopButton
          isPlaying={this.state.isPlaying}
          handleClick={this.togglePlaying}
        />
        <Sequence />
      </div>
    );
  }
};

export default BeatSequencer;
