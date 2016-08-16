// Modules
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import classnames from 'classnames';

// Components
import SelectInstrument from 'SelectInstrument';
import JamRoom from '../containers/JamRoom';

// Util
import { makePeerConnections, socket } from '../peer';
import store from 'store';

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      peerConnections: [],
      instrument: null,
      startJam: false
    };

    // play notes from peers

    this.selectInstrument = this.selectInstrument.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleStart = this.handleStart.bind(this);
  }

  componentDidMount() {
    // setup peer connections, give it lots of callbacks
    makePeerConnections(
      // roomId
      this.props.params.roomId,
      // set state when all connection are made
      peerConnections => { this.setState({ finished: true }); },
      // play sound when peer connection receives data
      data => {
        const { instrument, keyPressed } = JSON.parse(data);
        store[instrument](keyPressed);
      },
      // add peer connection to state whenever it's made
      peer => { this.setState({ peerConnections: this.state.peerConnections.concat([peer]) }); },
      // remove connection from state when destroyed
      peer => {
        const pcs = this.state.peerConnections;
        const index = pcs.indexOf(peer);
        this.setState({
          peerConnections: [...pcs.slice(0, index), ...pcs.slice(index + 1)]
        });
      }
    );

    socket.on('invalid room', () => {
      this.context.router.push('/invalid');
    });

    // event listener for keydown
    window.addEventListener('keydown', this.handleKeydown);
  }

  selectInstrument(instrument) {
    this.setState({ instrument });
  }

  handleKeydown(e) {
    if (this.state.peerConnections.length > 0) {
      this.state.peerConnections.forEach(peer => {
        peer.send(JSON.stringify({
          instrument: this.state.instrument,
          keyPressed: e.key
        }));
      });
    }
    store[this.state.instrument](e.key);
  }

  handleStart() {
    this.setState({ startJam: true });
  }

  render() {
    const opacity = instrument => classnames({ selected: this.state.instrument === instrument }, 'instrument');
    return (
      <div>
        {
          this.state.startJam ?
            <JamRoom instrument={this.state.instrument} peers={this.state.peerConnections} />:
            <div>
              <SelectInstrument handleClick={this.selectInstrument} opacity={opacity} />
              <RaisedButton
                style={{ bottom: 0, position: "absolute" }}
                label="Start"
                onClick={this.handleStart}
                disabled={!this.state.finished || !this.state.instrument}
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
