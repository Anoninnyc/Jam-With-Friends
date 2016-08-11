import React, { Component } from 'react';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';

class StartJam extends Component {

  render() {
    if (this.props.inst==='start') {
      return (
        <div>
          <RaisedButton label="Choose an instrument"/>
        </div>
      );
    } else {
      return (
        <div>
          <RaisedButton label="Start Jamming" onClick={() => { this.props.change('JamRoom')}} />
        </div>
      );
    }
  }
}

StartJam.childContextTypes = {
          muiTheme: React.PropTypes.object.isRequired,
        };

export default StartJam;
