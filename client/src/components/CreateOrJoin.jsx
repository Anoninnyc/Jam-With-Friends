// Modules
import React, { Component } from 'react';
import shortid from 'shortid';
import io from 'socket.io-client'
// Material UI
import RaisedButton from 'material-ui/RaisedButton';
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

// Local file imports/Utils
import connectionManager from '../rtc';

const socket = io();

// dummyData
const tableData = [
  {
    roomName: 'Foobar',
    numPeople: '1 out of 4',
    instruments: 'Piano, Piano, Fry',
  },
  {
    roomName: 'Jamapp',
    numPeople: '3 out of 4',
    instruments: 'Fry, Fry, Fry',
  },
  {
    roomName: 'Rock Studio',
    numPeople: '2 out of 4',
    instruments: 'Fry, Drums',
  },
  {
    roomName: 'Boosh',
    numPeople: '2 out of 4',
    instruments: 'Piano',
  },
];

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
          <div>
            <Table
              fixedHeader
              fixedFooter
              selectable={false}
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
                  <TableHeaderColumn tooltip="ID">ID</TableHeaderColumn>
                  <TableHeaderColumn tooltip="Room Name">Room Name</TableHeaderColumn>
                  <TableHeaderColumn tooltip="Number Of People">Number Of People</TableHeaderColumn>
                  <TableHeaderColumn tooltip="Instruments Being Played">Instruments Being Played</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}
                deselectOnClickaway
                showRowHover
                stripedRows={false}
              >
                {tableData.map((row, index) => (
                  <TableRow key={index} selected={row.selected}>
                    <TableRowColumn>{index}</TableRowColumn>
                    <TableRowColumn>{row.roomName}</TableRowColumn>
                    <TableRowColumn>{row.numPeople}</TableRowColumn>
                    <TableRowColumn>{row.instruments}</TableRowColumn>
                  </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableRowColumn>Room Name</TableRowColumn>
                  <TableRowColumn>Number Of People</TableRowColumn>
                  <TableRowColumn>Instruments Being Played</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn colSpan="3" style={{ textAlign: 'center' }}>
                    Join Open Room
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
