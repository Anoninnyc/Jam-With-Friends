// Modules
import React, { Component } from 'react';
import shortid from 'shortid';

// Material UI
import RaisedButton from 'material-ui/RaisedButton';

// Local file imports
import { socket } from '../peer';

class CreateOrJoin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createRoomVal: '',
      showValidateError: false,
      showRoomTakenMessage: false,
    };

    socket.on('room created', (roomName) => {
      this.context.router.push(`room/${roomName}`);
    });

    socket.on('room name taken', () => {
      this.setState({
        showRoomTakenMessage: true,
      });
    });

    this.handleCreateRoomClick = this.handleCreateRoomClick.bind(this);
    this.handleCreateRoomChange = this.handleCreateRoomChange.bind(this);
  }

  handleCreateRoomClick(e) {
    e.preventDefault();
    let roomName;
    if (this.state.createRoomVal.match(/[^a-zA-Z1-9]+/g)) {
      this.setState({
        showValidateError: true,
      });
      return;
    }
    if (this.state.createRoomVal === '') {
      roomName = shortid.generate();
    } else {
      roomName = this.state.createRoomVal;
      this.setState({
        createRoomVal: '',
      });
    }

    socket.emit('create room', roomName);
  }
  // match nothing: ^(?![\s\S])
  handleCreateRoomChange(e) {
    if (!this.state.showValidateError && !this.state.showRoomTakenMessage) {
      this.setState({
        createRoomVal: e.target.value,
        showValidateError: false,
        showRoomTakenMessage: false,
      });
    } else if (!this.state.showValidateError) {
      this.setState({
        createRoomVal: e.target.value,
        showValidateError: false,
      });
    } else if (!this.state.showRoomTakenMessage) {
      this.setState({
        createRoomVal: e.target.value,
        showRoomTakenMessage: false,
      });
    } else {
      this.setState({
        createRoomVal: e.target.value,
      });
    }
  }

  render() {
    return (
      <div>
        <div id="createView" style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-65%, -50%)', textAlign: 'center' }}>
          <div>
            If you can't think of a good room name, just click "Create Room brog"
             and we will provide you with a random room name.
          </div>
          <form>
            <input
              type="text"
              value={this.state.createRoomVal}
              onChange={this.handleCreateRoomChange}
              placeholder="Enter a Room Name..."
              pattern="[a-zA-Z1-9]+"
              style={{ height: '32px' }}
            />
            <RaisedButton onClick={this.handleCreateRoomClick} label="Create Room broh" />
          </form>
          {
            this.state.showValidateError
            ? <div>
              Room names can only contain letters or numbers.
               Please enter correct combination of character to make room
            </div>
            : null
          }
          {
            this.state.showRoomTakenMessage
            ? <div>
              Room name is taken
            </div>
            : null
          }
        </div>
        <div id="join-view" style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-65%, -50%)', textAlign: 'center' }} >
          <div>
            Have a link already?  Just paste it into your url bar!  Otherwise, checkout the open rooms below.  Click to join!
          </div>
        </div>
      </div>
    );
  }
}

CreateOrJoin.contextTypes = {
  router: React.PropTypes.object
};

export default CreateOrJoin;
