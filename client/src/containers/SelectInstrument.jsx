import RaisedButton from 'material-ui/RaisedButton';
import React, { Component } from 'react';
import StartJam from './StartJam';

class SelectInstrument extends Component {

  render() {
    return (
      <div>Choose an Instrument!<br />
        <RaisedButton label="Piano goes here" onClick={() => { this.props.sel('piano')}} />
        <RaisedButton label="Drums go here" onClick={() => { this.props.sel('drums')}} />
        <StartJam change={this.props.change} inst={this.props.inst} />
      </div>
    );
  }
}

SelectInstrument.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default SelectInstrument;
