// Modules
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import classnames from 'classnames';

// Components
import SelectInstrument from '../components/SelectInstrument';
import JamRoom from '../components/JamRoom';

// Util
import connectionManager from '../rtc';
import store from '../instruments/store';

const io = require('socket.io-client');

const socket = io();

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: connectionManager.isConnected(),
      instrument: null,
      startJam: false,
      peers: [],
    };

    this.updateConnection = this.updateConnection.bind(this);
    this.selectInstrument = this.selectInstrument.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handlePeerInfo = this.handlePeerInfo.bind(this);
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
    if (this.state.instrument) {
      store[this.state.instrument](e.key);
    }
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

  selectInstrument(instrument) {
    this.setState({ instrument });
  }

  updateConnection() {
    this.setState({ connected: connectionManager.isConnected() });
  }

  handlePeerInfo() {
    // username could go in here
    const peerInfo = {
      instrument: this.state.instrument,
      peerId: connectionManager.peerSocket().id,
      roomId: this.props.params.roomId,
    };
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

  render() {
    const opacity = instrument => classnames({ selected: this.state.instrument === instrument }, 'instrument');
    return (
      <div>
        {
          this.state.startJam ?
            <JamRoom instrument={this.state.instrument} peers={this.state.peers} /> :
            <div>
              <SelectInstrument handleClick={this.selectInstrument} opacity={opacity} />
              <RaisedButton
                style={{ bottom: 0, position: "absolute" }}
                label="Start"
                onClick={this.handleStart}
                disabled={!this.state.connected || !this.state.instrument}
              />
            </div>
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

