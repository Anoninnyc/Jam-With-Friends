// Modules
import React, { Component } from 'react';
import shortid from 'shortid';
import $ from 'jquery';

// Material UI
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Table, TableBody, TableFooter, TableHeader,
        TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

class CreateOrJoin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createRoomVal: '',
      createPrivRoomVal: '',
      showValidateError: false,
      showRoomTakenMessage: false,
      rooms: [],
      privateRooms: [],
      openPrivRoomMenu: false,
    };
    // create room form logic
    this.handleCreateRoomSubmit = this.handleCreateRoomSubmit.bind(this);
    this.handleCreateRoomChange = this.handleCreateRoomChange.bind(this);
    this.handleCreatePrivateRoomSubmit = this.handleCreatePrivateRoomSubmit.bind(this);
    this.handleCreatePrivateRoomChange = this.handleCreatePrivateRoomChange.bind(this);
    this.showRoomTakenErrorMessage = this.showRoomTakenErrorMessage.bind(this);
    // create a private room
    this.handleSendToPrivRoom = this.handleSendToPrivRoom.bind(this);

    // join a room on click
    this.handleRowClick = this.handleRowClick.bind(this);

    // needed to remove socket event listeners
    this.updateRooms = this.updateRooms.bind(this);
    this.checkErrorStates = this.checkErrorStates.bind(this);

    // Material UI popover logic
    this.handleTapPrivRoom = this.handleTapPrivRoom.bind(this);
    this.handleTapPrivRoomClose = this.handleTapPrivRoomClose.bind(this);
  }

  componentDidMount() {
    this.props.socket.on('room created', (roomName) => {
      this.context.router.push(`/room/${roomName}`);
    });

    this.props.socket.on('room name taken', this.showRoomTakenErrorMessage);

    // on refresh, componentDidMount may fire before socket has connected to server
    // resulting in an undefined socket.id and bug where the information needed for
    // the open room table is not loaded.  Fixed by checking for socket.id and waiting
    // for connection if socket.id is undefined
    if (this.props.socket.id) {
      this.props.socket.emit('get rooms info', this.props.socket.id);
    } else {
      this.props.socket.on('connected', () => this.props.socket.emit('get rooms info', this.props.socket.id));
    }

    this.props.socket.on('give rooms info', this.updateRooms);

    // get private rooms from server/db if user is logged in
    if (this.props.loggedIn) {
      $.get('/getprivaterooms')
        .then((privateRooms) => {
          console.log(privateRooms);
          this.setState({
            privateRooms,
          });
        });
    }
  }

  componentWillUnmount() {
    this.props.socket.removeListener('room name taken', this.showErrorMessage);
    this.props.socket.removeListener('give rooms info', this.updateRooms);
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
    const data = {
      roomId: roomName,
      isPrivate: false,
    };
    this.props.socket.emit('create room', data);
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

  handleCreatePrivateRoomSubmit(e) {
    e.preventDefault();
    if (this.state.showValidateError) {
      return;
    }
    let roomName;
    if (this.state.createRoomVal !== '') {
      roomName = `${shortid.generate()}-${this.state.createPrivRoomVal}`;
    } else {
      roomName = `${shortid.generate()}-${shortid.generate()}`;
    }
    // send server the roomname.  Username is taken from session
    $.post('/makeprivateroom', { roomName }, (res) => {
      if (res !== 'OK') {
        console.log(res);
      } else {
        console.log('SUCCESS!!!');
        const data = {
          roomId: roomName,
          isPrivate: true,
        };
        this.props.socket.emit('create room', data);
      }
    });
  }

  handleCreatePrivateRoomChange(e) {
    if (e.target.value.match(/[^a-zA-Z1-9]+/g)) {
      this.setState({
        showValidateError: true,
        createPrivRoomVal: e.target.value,
      });
    } else if (this.state.showValidateError && e.target.value.match(/[^a-zA-Z1-9]+/g) === null) {
      this.setState({
        createPrivRoomVal: e.target.value,
        showValidateError: false,
      });
    } else {
      this.setState({
        createPrivRoomVal: e.target.value,
      });
    }
  }

  handleRowClick(rowNum, colNum) {
    // fix to check if room is full first
    this.context.router.push(`/room/${this.state.rooms[rowNum].roomName}`);
  }

  handleTapPrivRoom(e) {
    e.preventDefault();
    this.setState({
      openPrivRoomMenu: true,
      anchorEl: e.currentTarget,
    });
  }

  handleTapPrivRoomClose() {
    this.setState({
      openPrivRoomMenu: false,
    });
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

  handleSendToPrivRoom(e, menuItem, index) {
    e.preventDefault();

    const data = {
      roomId: this.state.privateRooms[index],
      // userName: this.props.user,
      isPrivate: true,
    };

    const roomName = this.state.privateRooms[index];
    this.props.socket.emit('create room', data);
  }

  render() {
    console.log(this.props.userInstruments, 'the users instruments');
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
          <div>
            Create a private room here.  Name it anything you want!
          </div>
          <form onSubmit={this.handleCreatePrivateRoomSubmit}>
            <TextField
              hintText="Enter a Private Room Name..."
              onChange={this.handleCreatePrivateRoomChange}
              errorText={this.checkErrorStates()}
            />
            <RaisedButton
              onClick={this.handleCreatePrivateRoomSubmit}
              label="Create Private Room broh"
            />
          </form>
          {
            this.props.loggedIn
            ?
              <div className="old-private-rooms">
                <RaisedButton
                  onTouchTap={this.handleTapPrivRoom}
                  label="Click to view your old private rooms"
                />
                <Popover
                  open={this.state.openPrivRoomMenu}
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                  targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                  onRequestClose={this.handleTapPrivRoomClose}
                >
                  <Menu onItemTouchTap={this.handleSendToPrivRoom}>
                    {
                      this.state.privateRooms.map((room, key) => (
                        <MenuItem value={room.slice(9)} primaryText={room.slice(9)} />
                      ))
                    }
                  </Menu>
                </Popover>
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

CreateOrJoin.propTypes = {
  socket: React.PropTypes.object,
  loggedIn: React.PropTypes.bool,
  userInstruments: React.PropTypes.array,
};

CreateOrJoin.contextTypes = {
  router: React.PropTypes.object
};

export default CreateOrJoin;
