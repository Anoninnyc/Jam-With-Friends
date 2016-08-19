import React, { Component } from 'react';
import Row from './Row';

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
      sequence: [0, 0, 0, 0]
    };

    this.toggleBeat = this.toggleBeat.bind(this);
  }

  toggleBeat(index) {
    const sequence = this.state.sequence;
    const newValue = sequence[index] === 0 ? 1 : 0;

    this.setState({
      sequence: [...sequence.slice(0, index), newValue, ...sequence.slice(index + 1)]
    });
  }

  render() {
    return (
      <Row sequence={this.state.sequence} handleClick={this.toggleBeat} />
    );
  }
};

export default Sequence;
