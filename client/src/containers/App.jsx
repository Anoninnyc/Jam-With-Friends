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
        <Link to="selectRoom">Select Room</Link>
        <Link to="jam">Jam!</Link>
        {
          this.props.children ?
            <section className="child">
              {this.props.children}
            </section> :
            null
        }

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
