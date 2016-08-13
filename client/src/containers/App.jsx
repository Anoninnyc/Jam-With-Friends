import React, { Component } from 'react';
import { Link } from 'react-router';
// for future material ui use
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Nav from '../components/Nav';

class App extends Component {
  constructor(props) {
    super(props);
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  render() {
    return (
      <div>
        <Nav title={'tbd'} />
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
        <section className="child">
          { this.props.children }
        </section>
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
