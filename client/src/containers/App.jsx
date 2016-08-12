import React, { Component } from 'react';
import { Link } from 'react-router';
// for future material ui use
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Nav from './Nav';

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
      roomType,
      RoomId: RoomId ? this.state.RoomId : RoomId,
      view: "selectInstrument",
    });
  }

  render() {
    return (
      <div>
        <Nav />
        <Link to="/">Home</Link>
        <Link to="login">Login</Link>
        <Link to="signup">Signup</Link>
        <Link to="selectInstrument">Select Instrument</Link>
        {/*
          this.state.view==='selectInstrument' ?
          <SelectInstrument
            sel={this.toggleInstrument}
            inst={this.state.instrument}
            change={this.toggleView}
          />
          : null
        */}
        <Link to="selectRoom">Select Room</Link>
        {/*
          this.state.view==='SelectRoom' ?
            <SelectRoom rooms={this.toggleRoom} />
            : null
        */}
        <Link to="jam">Jam!</Link>
        {/*
          this.state.view==='JamRoom' ?
            <JamRoom
              inst={this.state.instrument}
            />
            : null
        */}
        { this.props.children }
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element
};

// For material ui
App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default App;
