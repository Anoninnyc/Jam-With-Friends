import React, { Component } from 'react';
import { Transport } from 'tone';
import Sequence from './Sequence';
import PlayStopButton from './PlayStopButton';
import AddSequenceButton from './AddSequenceButton';
import TempoSlider from './TempoSlider';

/**
 * logic of:
 * - changing BPM
 * - beat grouping
 * - pass sounds to sequence
 */
class BeatSequencer extends Component {
  constructor(props) {
    super(props);

    const bpm = 120;
    Transport.bpm.value = bpm;

    this.state = {
      bpm,
      isPlaying: false
    };

    this.togglePlaying = this.togglePlaying.bind(this);
    this.changeBPM = this.changeBPM.bind(this);
    this.addSequence = this.addSequence.bind(this);
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

  changeBPM(_event, value) {
    this.setState({ bpm: value });
    Transport.bpm.value = value;
  }

  addSequence() {
    console.log('You clicked the addSequence button');
  }

  render() {
    return (
      <div className="beatSequencer">
        <div className="controls">
          <h2>Controls</h2>
          <PlayStopButton
            isPlaying={this.state.isPlaying}
            handleClick={this.togglePlaying}
          />
          <TempoSlider
            bpm={this.state.bpm}
            changeBPM={this.changeBPM}
          />
          Tempo: { this.state.bpm } bpm
        </div>
        <hr />
        <div className="sequences">
          <h2>Sequences</h2>
          <Sequence
            isPlaying={this.state.isPlaying}
          />
          <AddSequenceButton handleClick={this.addSequence} />
        </div>
      </div>
    );
  }
}

export default BeatSequencer;
