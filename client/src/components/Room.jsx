import React from 'react';
import _ from 'lodash';
import makePeerConnections from '../peer';
import playNote from 'sounds';

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      peerConnections: []
    };
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  componentDidMount() {
    // setup peer connections, give it lots of callbacks
    makePeerConnections(
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
    // event listener for keydown
    window.addEventListener('keydown', this.handleKeydown);
  }

  handleKeydown(e) {
    if (this.state.peerConnections.length > 0) {
      this.state.peerConnections.forEach(peer => { peer.send(e.key); });
    }
    playNote(e.key);
  }

  render() {
    return (
      <div>
        { this.state.finished ? <p>Playing</p> : <p>Loading</p> }
      </div>
    );
  }
}

export default Room;
