import React, { Component } from 'react';

import io from 'socket.io-client';

// for future material ui use
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Nav from '../components/Nav';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      user: "",
      userInstruments: []
    };
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.updateUserInstrument = this.updateUserInstrument.bind(this);
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  updateUserInstrument(totalInstruments) {
    this.setState({
      userInstruments: totalInstruments,
    });
  }

  logIn(userName, userInstruments) {
    this.setState({
      loggedIn: true,
      user: userName,
      userInstruments,
    });
  }

  logOut() {
   // console.log('Main logout being called');
    this.setState({
      loggedIn: false,
      user: "",
    });
  }

  render() {
    const children = React.Children.map(this.props.children, child => (
       React.cloneElement(child, {
         loggedIn: this.state.loggedIn,
         logIn: this.logIn,
         logOut: this.logOut,
         user: this.state.user,
         userInstruments: this.state.userInstruments,
         updateUserInstrument: this.updateUserInstrument,
         socket: io()
       })
    ));
    return (
      <div>
        <Nav userInstruments={this.state.userInstruments} logIn={this.logIn} logOut={this.logOut} user={this.state.user} loggedIn={this.state.loggedIn} title={'tbd'} />
        {
          this.props.children ?
            <section className="child">
              {children}
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
