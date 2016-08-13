import React from 'react';
import playNote from 'sounds';

import { makePeerConnections, socket } from '../peer';

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
      console.log('NOT A VALID ROOM');
      this.context.router.push('/invalid');
    });
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

Room.propTypes = {
  params: React.PropTypes.object
};

Room.contextTypes = {
  router: React.PropTypes.object
};

export default Room;
