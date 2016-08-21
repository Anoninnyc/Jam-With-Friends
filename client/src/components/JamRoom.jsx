import React, { Component } from 'react';

import Piano from './Piano';
import Drums from './Drums';
import PeerBar from './PeerBar';
import Invite from './Invite';

class JamRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showInviteView: false,
      copied: false,
    };
    this.toggleInviteView = this.toggleInviteView.bind(this);
  }

  toggleInviteView() {
    if (this.state.showInviteView) {
      this.setState({ showInviteView: false });
    } else {
      this.setState({ showInviteView: true });
    }
  }
 
  render() {
    return (
      <div id="jamroom">
        <div id="display-inst-name"><h1>You are playing the {this.props.instrument}</h1></div>
        <div>
          {this.props.instrument === 'drums' ? <Drums /> : null}
          {this.props.instrument === 'piano' ? <Piano /> : null}
        </div>
        <PeerBar
          ownInstrument={this.props.instrument}
          peers={this.props.peers}
          toggleInviteView={this.toggleInviteView}
        />
        {
          this.state.showInviteView ?
            <Invite open={this.state.showInviteView} onRequestClose={this.toggleInviteView} /> :
            null
        }
      </div>
    );
  }
}

JamRoom.propTypes = {
  instrument: React.PropTypes.string,
  peers: React.PropTypes.array
};

export default JamRoom;
