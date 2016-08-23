// Modules
import React from 'react';

// Components
import SelectInstrument from './SelectInstrument';
import JamRoom from './JamRoom';
import Help from './Help';

// Util
import connectionManager from '../rtc';
import { store, instruments } from '../instruments/store';

const io = require('socket.io-client');

const socket = io();

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: connectionManager.isConnected(),
      instrument: instruments[0],
      startJam: false,
      peers: [],
      showPopover: false
    };

    this.updateConnection = this.updateConnection.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handlePeerInfo = this.handlePeerInfo.bind(this);
    this.handleHelp = this.handleHelp.bind(this);
  }

  componentDidMount() {
    connectionManager.setup(this.props.params.roomId);
    connectionManager.onStatusChange(this.updateConnection);

    // event listener for keypress
    window.addEventListener('keypress', this.handleKeypress);
  }

  componentWillUnmount() {
    connectionManager.offStatusChange(this.updateConnection);
    window.removeEventListener('keypress', this.handleKeypress);
    connectionManager.closeConnection();
  }

  setSocketListeners() {
    socket.on('invalid room', () => {
      this.context.router.push('/invalid');
    });

    connectionManager.peerSocket().on('remove connection', id => {
      const dummyArr = this.state.peers.slice();
      for (let i = 0; i < dummyArr.length; i++) {
        if (dummyArr[i].peerId === id) {
          dummyArr.splice(i, 1);
          break;
        }
      }
      this.setState({
        peers: dummyArr,
      });
    });
  }

  handleKeypress(e) {
    if (this.state.startJam) {
      connectionManager.sendMessage(JSON.stringify({
        instrument: this.state.instrument,
        keyPressed: e.key
      }));
    }
    store[this.state.instrument](e.key);
  }

  handleStart() {
    this.setState({ startJam: true });
    connectionManager.onMessage(data => {
      data = JSON.parse(data);
      store[data.instrument](data.keyPressed);
    });

    this.handlePeerInfo();
    this.setSocketListeners();
  }

  updateConnection() {
    this.setState({ connected: connectionManager.isConnected() });
  }

  handlePeerInfo() {
    // username could go in here
    const peerInfo = {
      instrument: this.state.instrument,
      peerId: connectionManager.id(),
      roomId: this.props.params.roomId,
    };

    // for join room update
    connectionManager.peerSocket().emit('instrument select', peerInfo);

    // send own info out
    connectionManager.peerSocket().emit('peer info', peerInfo);
    // ask for info
    connectionManager.peerSocket().emit('ask for peer info', peerInfo);
    // update/add peer connections
    connectionManager.peerSocket().on('peer info', newPeerInfo => {
      let newPeer = true;

      const arr = this.state.peers.slice();
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].peerId === newPeerInfo.peerId) {
          arr[i] = newPeerInfo;
          this.setState({
            peers: arr,
          });
          newPeer = false;
          break;
        }
      }
      if (newPeer) {
        this.setState({
          peers: this.state.peers.concat(newPeerInfo)
        });
      }
    });

    // send peer info to peer that requested it
    connectionManager.peerSocket().on('ask for peer info', info => {
      // include peer id of peer that requested info
      peerInfo.sendTo = info.peerId;
      connectionManager.peerSocket().emit('give peer info', peerInfo);
    });
  }

  handleHelp(event) {
    event.preventDefault();
    this.setState({
      showPopover: true,
      anchorEl: event.target
    });
  }

  render() {
    return (
      <div>
        <Help
          handleOpen={this.handleHelp}
          showPopover={this.state.showPopover}
          anchorEl={this.state.anchorEl}
          handleClose={() => { this.setState({ showPopover: false }); }}
        />
        {
          this.state.startJam ?
            <JamRoom
              instrument={this.state.instrument}
              peers={this.state.peers}
              onReselect={index => { this.setState({ instrument: instruments[index] }); }}
            /> :
            <SelectInstrument
              handleSelect={index => { this.setState({ instrument: instruments[index] }); }}
              handleClick={this.handleStart}
              size="normal"
            />
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

