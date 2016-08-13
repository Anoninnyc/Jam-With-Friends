import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

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
    <section className="joinOrCreateRoom">
      <RaisedButton
        label="Join Room"
        style={materialStyles}
      />
      <br />
      <TextField style={materialStyles} />
      <br />
      <RaisedButton
        label="Create Room"
        style={materialStyles}
      />
    </section>
  </div>
);

export default LandingPage;
