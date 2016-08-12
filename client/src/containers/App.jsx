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

    this.toggleRoom = this.toggleRoom.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.toggleInstrument=this.toggleInstrument.bind(this);
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
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
        {this.state.view === 'LandingPage' ?
          <div>
            <Nav change={this.toggleView} />
            <LandingPage change={this.toggleView} />
          </div>
          : null
        }
        {this.state.view === 'login' ?
          <Login change={this.toggleView} />
          : null
        }
        {this.state.view === 'signup' ?
          <Signup change={this.toggleView} />
          : null
        }
        {this.state.view==='selectInstrument' ?
          <SelectInstrument
            sel={this.toggleInstrument}
            inst={this.state.instrument}
            change={this.toggleView}
          />
          : null
        }
        {this.state.view==='SelectRoom' ?
          <SelectRoom rooms={this.toggleRoom} />
          : null
        }
        {this.state.view==='JamRoom' ?
          <JamRoom
            inst={this.state.instrument}
          />
          : null
        }
      </div>
    );
  }
}
// For material ui
App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default App;
