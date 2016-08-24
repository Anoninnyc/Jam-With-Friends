import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';

import Piano from './Piano';
import UserOwnInstrument from './UserOwnInstrument';
import Drums from './Drums';
import PeerBar from './PeerBar';
import Invite from './Invite';
import SelectInstrument from './SelectInstrument';

class JamRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showInviteView: false,
      showSelectView: false
    };
    this.toggleInviteView = this.toggleInviteView.bind(this);
    this.toggleSelectView = this.toggleSelectView.bind(this);
  }

  toggleInviteView() {
    this.setState({ showInviteView: !this.state.showInviteView });
  }

  toggleSelectView() {
    this.setState({ showSelectView: !this.state.showSelectView });
  }

  render() {
    return (
      <div id="jamroom">
        <div id="display-inst-name"><h1>You are playing {this.props.instrument}</h1></div>
        <div>
          {this.props.instrument === 'drums' ? <Drums /> : null}
          {this.props.instrument === 'piano' ? <Piano /> : null}
          {this.props.instrument.slice(0, 4) === "Your"? <UserOwnInstrument /> :null}
        </div>
        <PeerBar
          peers={this.props.peers}
          toggleInviteView={this.toggleInviteView}
          toggleSelectView={this.toggleSelectView}
        />
        <Invite open={this.state.showInviteView} onRequestClose={this.toggleInviteView} />
        <Dialog
          open={this.state.showSelectView}
          onRequestClose={this.toggleSelectView}
        >
          <SelectInstrument
            handleSelect={this.props.onReselect}
            handleClick={this.toggleSelectView}
            size="inset"
            ownInstrument={this.props.instrument}
          />
        </Dialog>
      </div>
    );
  }
}

JamRoom.propTypes = {
  instrument: React.PropTypes.string.isRequired,
  peers: React.PropTypes.array.isRequired,
  onReselect: React.PropTypes.func.isRequired
};

export default JamRoom;
