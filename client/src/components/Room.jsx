// Modules
import React from 'react';
import { MembraneSynth } from "tone";
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
      mapping: [],
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
    console.log('room did mount');
    connectionManager.setup(this.props.params.roomId);
    connectionManager.onStatusChange(this.updateConnection);

  $.get("/userLoggedInToMakeInst", (resp, err) => {
    console.log('room did mount info', resp);
      console.log('this the the resp to userloggedintomakeinst', resp);
    if (resp[0]==null) {
      console.log('youre not logged in!');
        //this.context.router.push("login");
        } else {
            console.log('youshouldseethis');
           // console.log('resp1,resp2', resp[0], resp[1]);
            this.props.logIn(resp[0], resp[1]);
          }
        });
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
    if (store[this.state.instrument]) {
      store[this.state.instrument](e.key);
      if (this.state.startJam) {
        connectionManager.sendMessage(JSON.stringify({
          instrument: this.state.instrument,
          keyPressed: e.key,
          notesToPlay: [null, null, null],
        }));
      }
    } else {
      const instMap=this.state.mapping;
      const keyPressed= e.key.toUpperCase();
      const sequence=JSON.parse(instMap[keyPressed]);
      const note=sequence[1];
      const octave=sequence[2];
      const pd=sequence[3];
      const type=sequence[4];
      const combo= `${note}${octave}`;
console.log(sequence, note, octave, pd, type, combo);
      const config = {
        pitchDecay: pd||0.1,
        octaves: 7,
        oscillator: {
          type: type,
        },
        envelope: {
          attack: 0.001,
          decay: 0.1,
          sustain: 0.1,
          release: 2,
          attackCurve: 'linear'
        }
      };
      console.log(instMap, keyPressed, note, octave, pd, type, combo);

      const zimit = new MembraneSynth(config).toMaster();
      zimit.triggerAttackRelease(combo, '8n');
      console.log('e info', e.which);
      if (this.state.startJam) {
        connectionManager.sendMessage(JSON.stringify({
          instrument: this.state.instrument,
          keyPressed: e.key,
          notesToPlay: [combo, pd, type],
        }));
      }
    }
  }

  handleStart() {
    this.setState({ startJam: true });
    connectionManager.onMessage(data => {
      data = JSON.parse(data);
      if (store[data.instrument]) {
        store[data.instrument](data.keyPressed);
        console.log('youre OK if this is showing!', data.notesToPlay);
      } else {
        const info=data.notesToPlay;
        const combo=info[0];
        console.log('youre good if this is showing!', data.notesToPlay);

        const config = {
          pitchDecay: info[1]||0.1,
          octaves: 7,
          oscillator: {
            type: info[2],
          },
          envelope: {
            attack: 0.001,
            decay: 0.1,
            sustain: 0.1,
            release: 2,
            attackCurve: 'linear'
          }
        };
        const zimit = new MembraneSynth(config).toMaster();
        zimit.triggerAttackRelease(combo, '8n');
      }
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
    console.log(this.props.userInstruments, this.state.instrument, this.state.mapping, 'the users instruments');

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
              extraInstruments={this.props.userInstruments}
              handleSelect={
                index => {
                  this.setState({
                    mapping: this.props.userInstruments.map(a => {
                      console.log('heres the error', a);
                      return {
                        A: typeof a === 'string'?JSON.parse(a.A): a.A,
                        S: typeof a === 'string'?JSON.parse(a.S): a.S,
                        D: typeof a === 'string'?JSON.parse(a.D): a.D,
                        F: JSON.parse(a.F),
                        G: JSON.parse(a.G),
                        H: JSON.parse(a.H),
                        J: JSON.parse(a.J),
                        K: JSON.parse(a.K),
                        L: JSON.parse(a.L)
                      }
                    })[index - 3],
                    instrument: instruments.concat(this.props.userInstruments.map(a => (
                       `Your Instrument: ${a.instrumentName}`
                    )))[index]
                  });
                }
              }
              handleClick={this.handleStart}
              size="normal"
            />
        }
      </div>
    );
  }
}

Room.propTypes = {
  params: React.PropTypes.object,
  userInstruments: React.PropTypes.func.isRequired,
};

Room.contextTypes = {
  router: React.PropTypes.object
};

export default Room;
