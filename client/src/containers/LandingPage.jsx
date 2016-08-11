import React, { Component } from 'react';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
const style = {
  margin: 12,
};

class LandingPage extends Component {

  render() {
    return (
      <div id='roche'>
        WELCOME TO TBD! <br />
      <RaisedButton label="Join Room" style={style} onClick={() => { this.props.change('selectInstrument')}} />
        <input type="text" /><br />
        <RaisedButton label="Create Room" onClick={() => { this.props.change('selectInstrument')}} />
      </div>
    );
  }
}
  LandingPage.childContextTypes = {
          muiTheme: React.PropTypes.object.isRequired,
        };
export default LandingPage;
