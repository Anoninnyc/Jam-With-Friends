import RaisedButton from 'material-ui/RaisedButton';
import React, { Component } from 'react';
import StartJam from './StartJam';

class SelectInstrument extends Component {

  choose(instrument) {
     document.getElementById(instrument).style.opacity=1;

    if (instrument==="drumsChoose") {
     document.getElementById("pianoChoose").style.opacity=0.5;
    }
    if (instrument==="pianoChoose") {
     document.getElementById("drumsChoose").style.opacity=0.5;
    }
  }
  render() {
    return (
      <div id="selectInstrumentRoom">
        <img
          id="instLogo"
          src="../../../style/InstrumentRoomLogo.png"
        /><br />
        <img
          id="pianoChoose"
          src="http://handlinpiano2.codyhandlin.com/wp-content/uploads/2016/06/grandepiano_2.png" 
          onClick={() => { this.props.sel('piano'); this.choose('pianoChoose'); }}
        />
        <img
          id="drumsChoose"
          src="http://www.vancouvertop40radio.com/Images/Clip%20Art/drumset.gif"
          onClick={() => { this.props.sel('drums'); this.choose('drumsChoose'); }}
        />
        <div id="jamButton"><StartJam change={this.props.change} inst={this.props.inst} /></div>
      </div>
    );
  }
}

SelectInstrument.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default SelectInstrument;
