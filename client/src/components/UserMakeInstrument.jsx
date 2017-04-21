// Tones
import React, { Component } from 'react';
import { MembraneSynth } from "tone";
import { Link } from 'react-router';
// Components
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import UserOwnInstrument from './UserOwnInstrument';

// Utils
import { display, types, animateInst, paperStyle, keys, notes, octaves, pd, showErrorMessage, mapIdsToKeys, mapKeysToIds, envelopeValue, mapPianoKeyPress, initialUMIState } from '../utils/helperFunctions';

class UserMakeInstrument extends Component {

  constructor(props) {
    super(props);
    this.deleteKey = this.deleteKey.bind(this);
    this.mapKey = this.mapKey.bind(this);
    this.killKeypress = this.killKeypress.bind(this);
    this.addKeypress = this.addKeypress.bind(this);
    this.logIn = this.props.logIn.bind(this);
    this.makeInstrument = this.makeInstrument.bind(this);
    this.state = initialUMIState;
  }

  componentWillUnmount() {
    $(document).off();
  }

  keyHelper(ID) {
    // This will render visual notes and call audio rendering method...
    const keyMapped = this.state.inMemObject[mapIdsToKeys[ID]];
    if (!this.state.tryingToName && keyMapped) {
      // console.log("Playing", keyMapped);
      const keyInfo = JSON.parse(keyMapped);
      this.setState({
        noteValue: keyInfo[1],
        octaveValue: keyInfo[2],
        PDValue: keyInfo[3],
        typeValue: keyInfo[4],
      });
      this.sampleSound();
      animateInst(ID, "black", "white", 20);
    }
  }

  sampleSound() {
    // Audio rendering method
    const combo = `${this.state.noteValue}${this.state.octaveValue}`;
    const config = {
      pitchDecay: this.state.PDValue||0.1,
      octaves: 7,
      oscillator: {
        type: this.state.typeValue,
      },
      envelope: envelopeValue
    };
    const zimit = new MembraneSynth(config).toMaster();
    zimit.triggerAttackRelease(combo, '8n');
  }

  mapKey({ noteValue, octaveValue, PDValue, typeValue, keyValue }) {
    // Map key to sound in test instrument
    const inMemObject = this.state.inMemObject;
    inMemObject[keyValue] = JSON.stringify(["N/A", noteValue, octaveValue, PDValue, typeValue]);
    if (!noteValue&&!octaveValue&&!PDValue&&!typeValue) {
      showErrorMessage("#makeInstErrorMessages", 'Please make a Proper Mapping', 'propMapError');
    } else {
      //console.log(inMemObject);
      const idToAdd = mapKeysToIds[keyValue];
      const activeKeys = this.state.activeKeys;
      activeKeys[idToAdd] = true;
      this.setState({
        noteValue: "A",
        octaveValue: 1,
        PDValue: 0.1,
        typeValue: "sine",
        inMemObject,
        activeKeys,
      });
    }
  }


  makeInstrument() {
    // Create instrument (if no errors)
    // ToDo -condense this method
    const name = this.refs.instName.getValue();
    const currentInMemObj = this.state.inMemObject;
    currentInMemObj.instrumentName = name;
    // TODO: Set username based off of sessions
    currentInMemObj.userName = this.props.user;

    let empty = true;
    // Done to avoid React Warning
    const keysForInst = Object.keys(currentInMemObj);
    for (let i = 0; i < keysForInst.length; i++) {
      if (keysForInst[i].length === 1) {
        empty = false;
      }
    }

    if (!name.length) {
      showErrorMessage("#nameInstErrMessage", 'Pls name your instrument', 'npo');
    } else if (empty) {
      showErrorMessage("#nameInstErrMessage", 'Pls map some keys', 'npi');
    } else if (/\W/.test(name)) {
      showErrorMessage("#nameInstErrMessage", 'Letters and numbers only please!', 'regexErr');
    } else {
      this.props.socket.emit('newInstCreated', currentInMemObj);
      const final = this.props.userInstruments.concat([currentInMemObj]);
      this.props.updateUserInstrument(final);
      showErrorMessage("#nameInstErrMessage", 'Instrument Made!', 'makeThat');
      initialUMIState.activeKeys = {};
      initialUMIState.inMemObject = {};
      this.setState(initialUMIState);
    }
  }

  deleteKey() {
    // Undo a mapping
    const keyToDelete = this.state.keyValue;
    const inMemObject = this.state.inMemObject;
    delete inMemObject[keyToDelete];

    const idToClear = mapKeysToIds[keyToDelete];
    const activeKeys = this.state.activeKeys;
    delete activeKeys[idToClear];

   // console.log("inMemObject", inMemObject);
    this.setState({
      activeKeys,
      inMemObject,
    });
  }

  handleChange(property, evt) {
    // Handle change for audio parameters
   // console.log("state", this.state, property, evt.target.innerHTML);
    const target = evt.target.innerHTML;
    const newState = {};
    newState[property] = Number(target)===Number(target)?Number(target):target;
    this.setState(newState);
  }



  addKeypress() {
    // This and subsequent method exist so that, when naming the instrument, instrument doesn't play
    // Todo consolidate methods- i.e. this.setState({tryingToName:!this.state.tryingToName})
    if (this.state.tryingToName) {
      $(document).keypress((e) => {
        if (mapPianoKeyPress[e.which]) {
          this.keyHelper(mapPianoKeyPress[e.which]);
        }
      });
      this.setState({
        tryingToName: false,
      });
    }
  }

  killKeypress() {
    $(document).off();
    this.setState({
      tryingToName: true,
    });
  }

  render() {
    return (
      <div id="roomContainer">
        <div id="UserMakeInstrumentRoom">
          <Paper
            id="UMIPaper"
            style={paperStyle}
            zDepth={3}
          >
            <br />
            <h1 id="UMIHeader">Make Instrument Here!</h1>
            <Divider />
            <h2 className="step">Step One: Select a Key To Map To </h2>
            <DropDownMenu
              value={this.state.keyValue}
              onChange={this.handleChange.bind(this, "keyValue")}
              autoWidth={false}
            >
              {display(keys)}
            </DropDownMenu>
            <div id="deleteKey"> <RaisedButton label="Delete Key Mapping" onClick={this.deleteKey} /></div>
            <h2 className="step">Step Two: Set Your Parameters</h2>
            <div id="UMIParams">

            Note
              <DropDownMenu
                value={this.state.noteValue}
                onChange={this.handleChange.bind(this, "noteValue")}
                autoWidth={false}
              >
                {display(notes)}
              </DropDownMenu>

            Octave
              <DropDownMenu
                value={this.state.octaveValue}
                onChange={this.handleChange.bind(this, "octaveValue")}
                autoWidth={false}
              >
                {display(octaves)}
              </DropDownMenu>

            Pitch Decay
              <DropDownMenu
                value={this.state.PDValue}
                onChange={this.handleChange.bind(this, "PDValue")}
                autoWidth={false}
              >
                {display(pd)}
              </DropDownMenu>

            Sound Type
              <DropDownMenu
                value={this.state.typeValue}
                onChange={this.handleChange.bind(this, "typeValue")}
                autoWidth={false}
              >
                {display(types)}
              </DropDownMenu>

            </div> <br /><br />
            <div id="s3c"><text id="step3" >Step Three: </text>
              <RaisedButton id="mapSToKey" label="Map Sound to Key" onClick={() =>{ this.mapKey(this.state); }} /><br />
            </div>
            <div id="instNames">
              <TextField
                onClick={this.killKeypress}
                ref={"instName"}
                hintText="Only Letters and Numbers Please"
                floatingLabelText="Name your Instrument"
              />
              <br />
              <div id="nameInstErrMessage" />
              <RaisedButton label="Make the instrument" style={{ postion: "absolute", top: "50%" }} onClick={this.makeInstrument} /><br /><br />
              <Link to="/createorjoin">
                <RaisedButton
                  id="goToCreate"
                  label="Start Jamming!"
                  style={{ postion: "absolute", top: "50%" }}
                />
              </Link>
            </div>
            <h3 className="step">
              Click
                <span
                  onClick={this.state.tryingToName?this.addKeypress:this.killKeypress}
                  className={this.state.tryingToName?"enableKeyPress offPress":"enableKeyPress onPress"}
                > HERE</span> to {this.state.tryingToName?"enable":"disable"} keypress{this.state.tryingToName?" and play your instrument!":"."}
            </h3>
            <div id="testPiano">
              <UserOwnInstrument activeKeys={this.state.activeKeys} />
            </div>
            <div id="makeInstErrorMessages" />
          </Paper>
        </div>
      </div>
    );
  }
}

UserMakeInstrument.propTypes = {
  params: React.PropTypes.object,
  socket: React.PropTypes.object,
  userInstruments: React.PropTypes.array,
  logIn: React.PropTypes.func,
  updateUserInstrument: React.PropTypes.func,
  user: React.PropTypes.string,
};

UserMakeInstrument.contextTypes = {
  router: React.PropTypes.object
};


UserMakeInstrument.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
export default UserMakeInstrument;
