// Modules
import React, { Component } from 'react';
import Piano from './Piano';
import UserOwnInstrument from './UserOwnInstrument';
import Drums from './Drums';
import PeerBar from './PeerBar';
import Invite from './Invite';
import SelectInstrument from './SelectInstrument';
import { instruments } from '../instruments/store';
import { parseNote } from '../utils/helperFunctions';

//  Material.UI
import Dialog from 'material-ui/Dialog';

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
        <div className="instrumentContainer">
          {this.props.instrument === 'drums' ? <Drums /> : null}
          {this.props.instrument === 'piano' ? <Piano /> : null}
          {
            this.props.instrument === 'laserbells' ?
              <div id="laser">
                <img src="/assets/laser.svg" alt="laserbells" style={{ height: '100%' }} />
              </div> :
              null
          }
          {this.props.instrument.slice(0, 4) === "Your"? <div id="UOIInRoom"><UserOwnInstrument /></div> :null}
        </div>
        <PeerBar
          extraInstruments={this.props.extraInstruments}
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
            extraInstruments={this.props.extraInstruments}
            handleSelect={
              index => {
                this.setState({
                  mapping: this.props.extraInstruments.map(a => {
                   const letters = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
                   const obj = {};
                   letters.forEach(letter => {
                     obj[letter] = parseNote(letter, a);
                   });
                   return obj;
                 })[index - 3],
                  instrument: instruments.concat(this.props.extraInstruments.map(a => (
                     `Your Instrument: ${a.instrumentName||a.name}`
                  )))[index]
                });
              }
            }
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
  onReselect: React.PropTypes.func.isRequired,
  extraInstruments: React.PropTypes.array
};

export default JamRoom;
