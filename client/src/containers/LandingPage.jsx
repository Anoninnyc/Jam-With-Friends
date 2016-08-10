import React, { Component } from 'react';

class LandingPage extends Component {

  render() {
    return (
      <div id='roche'>
        WELCOME TO TBD! <br />
        <button onClick={() => { this.props.change('selectInstrument')}}>Join Room </button><br />
        <input type="text" /><br />
        <button onClick={() => { this.props.change('selectInstrument')}}>Create Room </button><br />
      </div>
    );
  }
}

export default LandingPage;
