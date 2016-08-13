import React, { Component } from 'react';
import UserInstrument from './UserInstrument';
import FriendInstrument from './FriendInstrument';
import Piano from './Piano';
import Drums from './Drums';

const style1 = {
  height: 200,
  width: 200,
  margin: 20,
  bottom: 0,
  textAlign: 'center',
  display: 'block',
};

class JamRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div id="jamroom">
        <div id="display-inst-name"><h1>You are playing the {this.props.instrument}</h1></div>
        <div className="peer-bar">
          <div id="peer-bar1"><div id="peer-name">You</div></div>
          {
            this.props.peers ?
            this.props.peers.map((peer, index) =>
              <div id={`peer-bar${index + 1}`} key={peer.channelName}><div id="peer-name">Friend {index + 1}</div></div>
            )
            : null
          }
        </div>
        <div id="user-instrument">
          {this.props.instrument === 'drums' ? <Drums /> : null}
          {this.props.instrument === 'piano' ? <Piano /> : null}
        </div>
      </div>
    );
  }
}

JamRoom.propTypes = {
  instrument: React.PropTypes.string,
  peers: React.PropTypes.array
};

export default JamRoom;
