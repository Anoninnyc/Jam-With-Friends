import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const style = {
  margin: 12,
};

class LandingPage extends Component {

  render() {
    return (
      <div >
        <p>WELCOME TO TBD!</p>
         <br />
        <RaisedButton label="Join Room" style={style} onClick={() => { this.props.change('selectInstrument')}} />
        <br /><TextField /><br />
        <RaisedButton label="Create Room" onClick={() => { this.props.change('selectInstrument')}} />
      </div>
    );
  }
}

LandingPage.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default LandingPage;
