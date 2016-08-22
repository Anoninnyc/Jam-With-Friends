import React, { Component } from 'react';
import Row from './Row';
import MuteButton from './MuteButton';
import EditSequence from './EditSequence';
import toneSequence from '../../instruments/beats/sequence';

/**
 * - toggles active sounds on a subdivision
 *   (generates a pattern based on user interaction)
 * - groups a beat (start with an easy default)
 * - renders a dumb row
 */
class Sequence extends Component {
  constructor(props) {
    super(props);

    const defaultEvents = [1, 0, 0, 1];
    const defaultSubdivision = '4n';
    const sound = this.props.sound;

    this.state = {
      sound,
      sequence: toneSequence(sound, defaultEvents, defaultSubdivision),
      events: defaultEvents, // events for ToneSequence object
      subdivision: defaultSubdivision,
      isMute: false,
      showPopover: false
    };

    this.toggleBeat = this.toggleBeat.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.closePopover = this.closePopover.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const willBePlaying = nextProps.isPlaying;

    if (willBePlaying) {
      this.state.sequence.start();
    } else {
      this.state.sequence.stop();
    }
  }

  toggleBeat(index) {
    const events = this.state.events;
    const newValue = events[index] === 0 ? 1 : 0;
    const newEvents = [
      ...events.slice(0, index),
      newValue,
      ...events.slice(index + 1)
    ];

    const newSequence = toneSequence(this.state.sound, newEvents, this.state.subdivision);

    this.setState({
      events: newEvents,
      sequence: newSequence
    });
  }

  toggleMute() {
    const isMute = this.state.isMute;

    this.setState({
      isMute: !isMute
    });
  }

  handleEdit(event) {
    event.preventDefault();
    this.setState({
      showPopover: true,
      anchorEl: event.target
    });
  }

  closePopover() {
    this.setState({ showPopover: false });
  }

  render() {
    return (
      <div className="sequence">
        <div className="controls">
          <MuteButton
            isMute={this.state.isMute}
            handleClick={this.toggleMute}
          />
          <EditSequence
            handleOpen={this.handleEdit}
            showPopover={this.state.showPopover}
            anchorEl={this.state.anchorEl}
            handleClose={this.closePopover}
          />
        </div>
        <Row events={this.state.events} handleClick={this.toggleBeat} />
      </div>
    );
  }
}

Sequence.propTypes = {
  sound: React.PropTypes.object.isRequired
};

export default Sequence;
