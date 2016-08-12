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
    this.connectedCallback = this.connectedCallback.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  componentDidMount() {
    const self = this;

    // pass lots of callbacks; set state and deal with receiving data
    makePeerConnections(
      this.connectedCallback,
      keyPressed => { playNote(keyPressed); },
      peer => { self.setState({ peerConnections: self.state.peerConnections.concat([peer]) }); }
    );
    // event listener for keydown
    window.addEventListener('keydown', this.handleKeydown);
  }

  connectedCallback(peerConnections) {
    this.setState({
      finished: true,
      peerConnections: _.map(peerConnections, 'peer')
    });
  }

  handleKeydown(e) {
    if (this.state.peerConnections.length > 0) {
      this.state.peerConnections.forEach(peer => { peer.send(e.key); });
    }
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
