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
    this.selectInstrument = this.selectInstrument.bind(this);
  }

  componentDidMount() {
    connectionManager.setup(this.props.params.roomId);
    connectionManager.onStatusChange(this.updateConnection);

    // event listener for keypress
    window.addEventListener('keypress', this.handleKeypress);
    socket.emit('add as listener', this.props.params.roomId);
  }

  componentWillUnmount() {
    connectionManager.offStatusChange(this.updateConnection);
    window.removeEventListener('keypress', this.handleKeypress);
    connectionManager.closeConnection();
    socket.removeListener('receive peer info', this.handlePeerInfo);
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

    socket.emit('select instrument', {
      roomId: this.props.params.roomId,
      id: connectionManager.id(),
      instrument: this.state.instrument
    });
    // this.setSocketListeners();
  }

  updateConnection() {
    this.setState({ connected: connectionManager.isConnected() });

    // get instrument info of everyone in room
    socket.emit('request peer info', {
      roomId: this.props.params.roomId,
      socketId: socket.id
    });

    socket.on('receive peer info', this.handlePeerInfo);
  }

  handlePeerInfo(data) {
    data = JSON.parse(data);
    // move self to beginning of peers array
    let index = 0;
    while ((index < data.length) && (data[index].peerId !== connectionManager.id())) {
      index++;
    }
    const selfInfo = data.splice(index, 1);
    this.setState({
      peers: selfInfo.concat(data)
    });
  }

  handleHelp(event) {
    event.preventDefault();
    this.setState({
      showPopover: true,
      anchorEl: event.target
    });
  }

  selectInstrument(index) {
    this.setState({ instrument: instruments[index] });
    if (this.state.connected) {
      socket.emit('select instrument', {
        roomId: this.props.params.roomId,
        id: connectionManager.id(),
        instrument: instruments[index]
      });
    }
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
              onReselect={this.selectInstrument}
            /> :
            <SelectInstrument
              handleSelect={this.selectInstrument}
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

