import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

const materialStyles = {
  margin: '0 auto',
  outline: '1px dashed black',
  display: 'block',
  width: '25%'
};

const LandingPage = (props) => (
  <div id="landingPage">
    <section className="title">
      <h1>WELCOME TO TBD!</h1>
    </section>
    <section className="joinRoom">
      <TextField style={materialStyles} />
      <RaisedButton
        label="Join Room"
        style={materialStyles}
      />
    </section>
    <section className="divider">
      <Divider />
    </section>
    <section className="createRoom">
      <RaisedButton
        label="Create Room"
        style={materialStyles}
      />
    </section>
  </div>
);

export default LandingPage;
