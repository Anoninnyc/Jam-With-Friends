// Modules
import React from 'react';
import { Link } from 'react-router';

// Material.UI
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

import {buttonStyles} from '../utils/helperFunctions';



const paperStyle = {
  position: 'absolute',
  left: '50%',
  height: '40%',
  width: '40%',
  transform: 'translate(-50%, 40%)',
  backgroundColor: 'rgba(68, 69, 69, 0.7)',
  borderRadius: 10
};

const LandingPage = () => (
  <div id="landingPage">
    <Paper style={paperStyle} zDepth={3}>
      <div className="greeting">Welcome to</div>
      <br />
      <div id="appName"> Jam with Friends! </div>
      <p id="explainer">Jam out with your friends using virtual instruments over a lightning-fast WebRTC connection.</p>
      <section className="divider">
        <Divider />
      </section>
      <section className="createRoom">
        <Link to="/createorjoin">
          <RaisedButton
            label="Start"
            style={buttonStyles}
            labelStyle={{ fontSize: 22 }}
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

