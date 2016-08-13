import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import shortid from 'shortid';

import { socket } from '../peer';

const materialStyles = {
  margin: '0 auto',
  display: 'block',
  width: '25%'
};

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const hash = shortid.generate();
    socket.emit('create room', hash);
    this.context.router.push(`room/${hash}`);
  }

  render() {
    return (
      <div id="landingPage">
        <section className="title">
          <h1>WELCOME TO TBD!</h1>
        </section>
        {/*
        <section className="joinRoom">
          <TextField style={materialStyles} />
          <RaisedButton
            label="Join Room"
            style={materialStyles}
          />
        </section>
        */}
        <section className="divider">
          <Divider />
        </section>
        <section className="createRoom">
          <RaisedButton
            label="Create Room"
            style={materialStyles}
            onClick={this.handleClick}
          />
        </section>
      </div>
    );
  }
}

LandingPage.contextTypes = {
  router: React.PropTypes.object
};

export default LandingPage;
