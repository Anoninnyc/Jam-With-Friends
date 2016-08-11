import React from 'react';
import _ from 'lodash';
import makePeerConnections from '../peer.js';

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
    makePeerConnections(this.connectedCallback);
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
      this.state.peerConnections[0].send(e.key);
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
