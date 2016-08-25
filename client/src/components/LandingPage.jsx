import React from 'react';
import { Link } from 'react-router';
import shortid from 'shortid';

// material ui components
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

const materialStyles = {
  color: '#6F8695',
  position: 'absolute',
  top: '50%',
  transform: 'translate(-50%, -50%)'
};

const paperStyle = {
  position: 'absolute',
  left: '50%',
  height: '60%',
  width: '40%',
  transform: 'translate(-50%, 30%)',
  backgroundColor: 'rgba(255, 255, 255, 1)'
};

const LandingPage = () => (
  <div id="landingPage">
    <Paper style={paperStyle} zDepth={3} circle={true}>
    <div className="greeting">WELCOME TO TBD!</div>
    <section className="divider">
      <Divider />
    </section>
    <section className="createRoom">
      <Link to="/createorjoin">
        <RaisedButton
          label="Start"
          style={materialStyles}
        />
      </Link>
    </section>
    </Paper>
  </div>
);

LandingPage.propTypes = {
  socket: React.PropTypes.object
};

export default LandingPage;

