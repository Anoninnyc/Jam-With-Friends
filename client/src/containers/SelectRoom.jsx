import React, { Component } from 'react';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class SelectRoom extends Component {

  render() {
    return (
      <div>
       <TextField /><br />
        <RaisedButton label="Join Room" onClick={() =>{this.props.rooms('OldRoom', "Provide the rooms id")}} />  
        <RaisedButton label="Create Room" onClick={() =>{this.props.rooms('NewRoom',"Give new room Id")}} />
      </div>
    );
  }
}

SelectRoom.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default SelectRoom;
