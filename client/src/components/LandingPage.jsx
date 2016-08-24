import React from 'react';
import { Link } from 'react-router';

// material ui components
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

const materialStyles = {
  position: 'absolute',
  top: '70%',
  left: '45%',
};

const paperStyle = {
  height: 300,
  width: 400,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  backgroundImage: 'url("http://bit.ly/2b2ePzs")',
  borderRadius: '12%',
  opacity: 0.6,
  padding: '5px',
  fontWeight: 900,
  fontFamily: '"Trebuchet MS", Helvetica, sansSerif'
};

const LandingPage = () => (
  <div id="landingPage">
    <section className="title">
      <h1>WELCOME TO TBD!</h1>
    </section>
    <section className="divider">
      <Divider />
    </section>
    <section className="createRoom">
      <div>
        <Paper style={paperStyle} zDepth={5} >
          <div id="introText">
            <p>LiveJam allows music aficianados to collaboratively jam out using virtual instruments.</p>
            <p>The app lets “Jammers” form or join dedicated rooms where they can create tracks
               (and lifetime memories) with one another.
            </p>
            <p>LiveJam’s rooms currently allow for up to four Jammers to collab per session.</p>
            <p>The app's use of direct peer-to-peer (serverless) communication, via WebRTC, allows users
               within 100 miles of one another to jam without lag, emulating the experience of using a real studio.
            </p>
          </div>
        </Paper>
        <p id="callToAction"> What are you waiting for?</p>
      </div>
      <img src="/Users/loaner/Desktop/tbd/client/public/style/RocheFace.png" alt="roche" />
      <Link to="/createorjoin">
        <RaisedButton
          label={<span style={{ fontSize: '30px', textTransform: 'none' }}>Jam Now!</span>}
          style={materialStyles}
        />
      </Link>
    </section>
  </div>
);

export default LandingPage;

