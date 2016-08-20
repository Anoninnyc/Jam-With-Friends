import React, { Component } from 'react';
import { Sequence as ToneSequence } from 'tone';
import Row from './Row';
import MuteButton from './MuteButton';
import { membrane } from '../../instruments/sounds/tick';


const toneSequence = (events, subdivision) => (
  // console.log(events);
  // console.log(subdivision);

  new ToneSequence(time => {
    // console.log(time);
    membrane.triggerAttackRelease('Bb5', '8n');
  }, events, subdivision)
);

/**
 * - toggles active sounds on a subdivision
 *   (generates a pattern based on user interaction)
 * - groups a beat (start with an easy default)
 * - renders a dumb row
 */
class Sequence extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sequence: null,
      events: [0, 1, 0, 1], // events for ToneSequence object
      subdivision: '4n',
      isMute: false
    };

    this.toggleBeat = this.toggleBeat.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
  }

  toggleBeat(index) {
    const events = this.state.events;
    const newValue = events[index] === 0 ? 1 : 0;

    this.setState({
      events: [...events.slice(0, index), newValue, ...events.slice(index + 1)]
    });
  }

  toggleMute() {
    const isMute = this.state.isMute;

    this.setState({
      isMute: !isMute
    });
  }

  render() {
    return (
      <div className="sequence">
        <MuteButton
          isMute={this.state.isMute}
          handleClick={this.toggleMute}
        />
        <Row events={this.state.events} handleClick={this.toggleBeat} />
      </div>
    );
  }
}

export default Sequence;
