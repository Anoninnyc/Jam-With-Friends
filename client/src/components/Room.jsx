import React from 'react';
import makePeerConnections from '../peer.js';

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false
    };
    this.connectedCallback = this.connectedCallback.bind(this);
  }

  componentDidMount() {
    makePeerConnections(this.connectedCallback);
  }

  connectedCallback() {
    this.setState({ finished: true });
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
