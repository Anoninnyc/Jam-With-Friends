// Modules
import React, { Component } from 'react';
import shortid from 'shortid';
import io from 'socket.io-client';
// Material UI
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

const socket = io();

class CreateOrJoin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createRoomVal: '',
      showValidateError: false,
      showRoomTakenMessage: false,
      rooms: [],
    };

    this.handleCreateRoomSubmit = this.handleCreateRoomSubmit.bind(this);
    this.handleCreateRoomChange = this.handleCreateRoomChange.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.updateRooms = this.updateRooms.bind(this);
    this.checkErrorStates = this.checkErrorStates.bind(this);
    this.showRoomTakenErrorMessage = this.showRoomTakenErrorMessage.bind(this);
  }

  componentDidMount() {
    socket.on('room created', (roomName) => {
      this.context.router.push(`/room/${roomName}`);
    });

    socket.on('room name taken', this.showRoomTakenErrorMessage);

    socket.emit('get rooms info', socket.id);

    socket.on('give rooms info', this.updateRooms);
  }

  componentWillUnmount() {
    socket.removeListener('room name taken', this.showErrorMessage);
    socket.removeListener('give rooms info', this.updateRooms);
  }

  showRoomTakenErrorMessage() {
    this.setState({
      showRoomTakenMessage: true,
    });

    setTimeout(() => {
      this.setState({
        showRoomTakenMessage: false,
      });
    }, 5000);
  }

  updateRooms(rooms) {
    this.setState({
      rooms,
    });
  }

  handleCreateRoomSubmit(e) {
    e.preventDefault();
    let roomName;
    if (this.state.showValidateError) {
      return;
    }
    if (this.state.createRoomVal === '') {
      roomName = shortid.generate();
    } else {
      roomName = this.state.createRoomVal;
    }
    socket.emit('create room', roomName);
  }
  // match nothing: ^(?![\s\S])
  handleCreateRoomChange(e) {
    if (e.target.value.match(/[^a-zA-Z1-9]+/g)) {
      this.setState({
        showValidateError: true,
        createRoomVal: e.target.value,
      });
    } else if (this.state.showValidateError && e.target.value.match(/[^a-zA-Z1-9]+/g) === null) {
      this.setState({
        createRoomVal: e.target.value,
        showValidateError: false,
      });
    } else {
      this.setState({
        createRoomVal: e.target.value,
      });
    }
  }

  handleRowClick(rowNum, colNum) {
    this.context.router.push(`/room/${this.state.rooms[rowNum].roomName}`);
  }

  checkErrorStates() {
    if (this.state.showValidateError) {
      return 'Room names can only contain letters or numbers';
    } else if (this.state.showRoomTakenMessage) {
      return 'Room name is taken';
    } else {
      return false;
    }
  }

  render() {
    return (
      <div className="create-or-join-view">
        <div
          id="create-room-view"
          style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translate(-65%, -50%)',
            textAlign: 'center',
          }}
        >
          <div>
            If you can't think of a good room name, just click "Create Room broh"
             and we will provide you with a random room name.
          </div>
          <form onSubmit={this.handleCreateRoomSubmit}>
            <TextField
              hintText="Enter a Room Name..."
              onChange={this.handleCreateRoomChange}
              errorText={this.checkErrorStates()}
            />
            <RaisedButton
              onClick={this.handleCreateRoomSubmit}
              label="Create Room broh"
            />
          </form>
        </div>
        <div
          id="join-room-view"
          style={{
            position: 'absolute',
            top: '60%',
            left: '50%',
            transform: 'translate(-65%, -50%)',
            textAlign: 'center'
          }}
        >
          <div>
            Have a link already?  Just paste it into your url bar!
            Otherwise, checkout the open rooms below.  Click to join!
          </div>
          <div id="join-view-room">
            <Table
              fixedHeader
              fixedFooter
              selectable
              onCellClick={this.handleRowClick}
              multiSelectable={false}
            >
              <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
                enableSelectAll={false}
              >
                <TableRow>
                  <TableHeaderColumn colSpan="4" tooltip="Join Open Room" style={{ textAlign: 'center' }}>
                    Join Open Room
                  </TableHeaderColumn>
                </TableRow>
                <TableRow>
                  <TableHeaderColumn>ID</TableHeaderColumn>
                  <TableHeaderColumn>Room Name</TableHeaderColumn>
                  <TableHeaderColumn>Number Of People</TableHeaderColumn>
                  <TableHeaderColumn>Instruments Being Played</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}
                deselectOnClickaway
                showRowHover
                stripedRows={false}
              >
                {
                  this.state.rooms.map((row, index) => (
                    <TableRow key={index} selected={row.selected}>
                      <TableRowColumn>{index + 1}</TableRowColumn>
                      <TableRowColumn>{row.roomName}</TableRowColumn>
                      <TableRowColumn>{`${row.numPeople} out of 4`}</TableRowColumn>
                      <TableRowColumn>{row.instruments.join(', ')}</TableRowColumn>
                    </TableRow>
                  ))
                }
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableRowColumn colSpan="4" style={{ textAlign: 'center' }}>
                    Click on a row to join!
                  </TableRowColumn>
                </TableRow>
              </TableFooter>
            </Table>
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
