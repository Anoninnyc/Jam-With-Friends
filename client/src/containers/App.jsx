import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import React, { Component } from 'react';
import LandingPage from './LandingPage';
import Nav from './Nav';
import Login from './Login';
import Signup from './Signup';
import SelectInstrument from './SelectInstrument';
import SelectRoom from './SelectRoom';
import JamRoom from './JamRoom';
// for future material ui use

class App extends Component {
  constructor(props) {
    super(props);
    this.toggleRoom = this.toggleRoom.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.toggleInstrument=this.toggleInstrument.bind(this);
    this.state = {
      view: "LandingPage",
      instrument: "start",
      roomType: "start",
      roomId: "start",
    };
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  toggleInstrument(inst) {
    this.setState({
      instrument: inst,
    });
  }

  toggleView(viewChange) {
    this.setState({
      view: viewChange,
    });
  }

  toggleRoom(roomType, RoomId) {
    this.setState({
      roomType: roomType,
      RoomId: RoomId?this.state.RoomId:RoomId,
      view: "selectInstrument",
    });
  }

  render() {
    if (this.state.view==='LandingPage') {
      return (
        <div>
          <Nav
            change={this.toggleView}
          />
          <LandingPage
            change={this.toggleView}
          />
        </div>
      );
    } else if (this.state.view==='login') {
      return (
        <div>
          <Login
            change={this.toggleView}
          />
        </div>
      );
    } else if (this.state.view==='signup') {
      return (
        <div>
          <Signup
            change={this.toggleView}
          />
        </div>
      );
    } else if (this.state.view==='selectInstrument') {
      return (
        <div>
          <SelectInstrument
            sel={this.toggleInstrument}
            inst={this.state.instrument}
            change={this.toggleView}
          />
        </div>
      );
    } else if (this.state.view==='SelectRoom') {
      return (
        <div>
          <SelectRoom
            rooms={this.toggleRoom}
          />
        </div>);
    } else if (this.state.view==='JamRoom') {
      return (
        <div>
          <JamRoom
            inst={this.state.instrument}
          />
        </div>
      );
    }
  }
}
// For material ui
App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default App;
