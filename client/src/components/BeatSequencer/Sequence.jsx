import React, { Component } from 'react';
import Row from './Row';
import { Sequence as ToneSequence } from 'tone';
import { membrane } from '../../instruments/sounds/tick';
import MuteButton from './MuteButton'

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
      sequence: [0, 0, 0, 0],
      isMute: false
    };

    this.toggleBeat = this.toggleBeat.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
  }

  toggleBeat(index) {
    const sequence = this.state.sequence;
    const newValue = sequence[index] === 0 ? 1 : 0;

    this.setState({
      sequence: [...sequence.slice(0, index), newValue, ...sequence.slice(index + 1)]
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
        <Row sequence={this.state.sequence} handleClick={this.toggleBeat} />
      </div>
    );
  }
};

export default Sequence;
