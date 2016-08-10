import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import React, { Component } from 'react';
import LandingPage from './LandingPage';
import Nav from './Nav';
import Login from './Login';
import Signup from './Signup';
import SelectInstrument from './SelectInstrument';
import SelectRoom from './SelectRoom';
import JamRoom from './JamRoom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "LandingPage",
      instrument: "start",
      roomType: "start",
      roomId: "start"
    };
  }

  toggleInstrument(inst) {
    this.setState({
      instrument: inst
    });
  }

  toggleView(viewChange) {
    this.setState({
      view: viewChange
    });
  }

  toggleRoom(roomType, RoomId) {
    this.setState({
      roomType: roomType,
      RoomId: RoomId?this.state.RoomId:RoomId,
      view: "selectInstrument"
    });
  }

  render() {
    if (this.state.view==='LandingPage') {
      return (
        < div >
          < Nav
            change={this.toggleView.bind(this)}
          / >
          < LandingPage
            change={this.toggleView.bind(this)}
          / >
        < /div>
      );
    } else if (this.state.view==='login') {
      return (
        < div >
          <Login
            change={this.toggleView.bind(this)}
          />
        < /div>
      );
    } else if (this.state.view==='signup') {
      return (
        < div >
          <Signup
            change={this.toggleView.bind(this)}
          />
        < /div>
      );
    } else if (this.state.view==='selectInstrument') {
      return (
        < div >
          <SelectInstrument
            sel={this.toggleInstrument.bind(this)}
            inst={this.state.instrument}
            change={this.toggleView.bind(this)}
          />
        < /div>
      );
    } else if (this.state.view==='SelectRoom') {
      return (
        <div>
          <SelectRoom
            rooms={this.toggleRoom.bind(this)}
          />
        </ div>

      );
    } else if (this.state.view==='JamRoom') {
      return (
        <div>
          <JamRoom
            inst={this.state.instrument}
          />
        </ div>
      );
    }
  }
}
export default App;
