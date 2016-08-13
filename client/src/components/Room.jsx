import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import classnames from 'classnames';

import SelectInstrument from 'SelectInstrument';
import playNote from 'sounds';

import { makePeerConnections, socket } from '../peer';

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      peerConnections: [],
      instrument: null,
      startJam: false 
    };
    this.selectInstrument = this.selectInstrument.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleStart = this.handleStart.bind(this);
  }

  componentDidMount() {
    // setup peer connections, give it lots of callbacks
    makePeerConnections(
      // roomId
      this.props.params.roomId,
      // set state when all connection are made
      peerConnections => { this.setState({ finished: true }); },
      // play sound when peer connection receives data
      keyPressed => { playNote(keyPressed); },
      // add peer connection to state whenever it's made
      peer => { this.setState({ peerConnections: this.state.peerConnections.concat([peer]) }); },
      // remove connection from state when destroyed
      peer => {
        const pcs = this.state.peerConnections;
        const index = pcs.indexOf(peer);
        this.setState({
          peerConnections: [...pcs.slice(0, index), ...pcs.slice(index + 1)]
        });
      }
    );

    socket.on('invalid room', () => {
      this.context.router.push('/invalid');
    });

    // event listener for keydown
    window.addEventListener('keydown', this.handleKeydown);
  }

  selectInstrument(instrument) {
    this.setState({ instrument });
  }

  handleKeydown(e) {
    if (this.state.peerConnections.length > 0) {
      this.state.peerConnections.forEach(peer => { peer.send(e.key); });
    }
    playNote(e.key);
  }

  handleStart() {
    this.setState({ startJam: true });
  }

  render() {
    const opacity = instrument => classnames({ selected: this.state.instrument === instrument }, 'instrument');
    return (
      <div>
        {
          this.state.startJam ?
            <p>Playing</p> :
            <div>
              <SelectInstrument handleClick={this.selectInstrument} opacity={opacity} />
              <RaisedButton
                label="Start"
                onClick={this.handleStart}
                disabled={!this.state.finished || !this.state.instrument}
              />
            </div>
        }
      </div>
    );
  }
}

Room.propTypes = {
  params: React.PropTypes.object
};

Room.contextTypes = {
  router: React.PropTypes.object
};

export default Room;
