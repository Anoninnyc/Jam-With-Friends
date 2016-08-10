import React, { Component } from 'react';

class SelectRoom extends Component {

  render() {
    return (
      <div>
       <input type="text" /><br />
        <button onClick={() =>{this.props.rooms('OldRoom', "Provide the rooms id")}}>Join Room </button><br />
       
        <button onClick={() =>{this.props.rooms('NewRoom',"Give new room Id")}}>Create Room </button><br />
      </div>
    );
  }
}

export default SelectRoom;
