// Tones
import React, { Component } from 'react';
import { MembraneSynth } from "tone";
import { Link } from 'react-router';
// Components
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import UserOwnInstrument from './UserOwnInstrument';

// Utils
import { display, types, animateInst, paperStyle, keys, notes, octaves, pd, showErrorMessage, mapIdsToKeys, mapKeysToIds, envelopeValue, mapPianoKeyPress, buttonStyles, initialUMIState } from '../utils/helperFunctions';

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
    const keyMapped = this.state.inMemObject[mapIdsToKeys[ID]];
    if (!this.state.tryingToName && keyMapped) {
      console.log(keyMapped);
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
    console.log(this.state);
    const inMemObject = this.state.inMemObject;
    inMemObject[keyValue] = JSON.stringify(["N/A", noteValue, octaveValue, PDValue, typeValue]);
    if (!noteValue&&!octaveValue&&!PDValue&&!typeValue) {
      showErrorMessage("#makeInstErrorMessages", 'Please make a Proper Mapping', 'propMapError');
    } else {
      console.log(inMemObject);
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
    const name = this.refs.instName.getValue();
    const currentInMemObj = this.state.inMemObject;
    currentInMemObj.instrumentName = name;
    currentInMemObj.userName = this.props.user;
    // console.log('uuu', this.props.user)
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
    } else if (/\W/.test(name)===true) {
      showErrorMessage("#nameInstErrMessage", 'Letters and numbers only please!', 'regexErr');
    } else {
      this.props.socket.emit('newInstCreated', currentInMemObj);
      // console.log(`youve created ${currentInMemObj} as opposed to`, this.props.userInstruments);
      const final = this.props.userInstruments.concat([currentInMemObj]);
      this.props.updateUserInstrument(final);
      showErrorMessage("#nameInstErrMessage", 'Instrument Made!', 'makeThat');
      console.log("Is this mutated??", initialUMIState);
      initialUMIState.activeKeys = {};
      initialUMIState.inMemObject = {};
      this.setState(initialUMIState);
    }
  }

  deleteKey() {
    const keyToDelete = this.state.keyValue;
    // console.log( "you want to delete"+ $(".selectKey option:selected").text());
    const inMemObject = this.state.inMemObject;
    delete inMemObject[keyToDelete];

    const idToClear = mapKeysToIds[keyToDelete];
    const activeKeys = this.state.activeKeys;
    delete activeKeys[idToClear];

    console.log("the first", inMemObject);
    this.setState({
      activeKeys,
      inMemObject,
    });
  }

  handleChange(property, evt) {
   // console.log("state", this.state, property, evt.target.innerHTML);
    const target = evt.target.innerHTML;
    const newState = {};
    newState[property] = Number(target)===Number(target)?Number(target):target;
    this.setState(newState);
  }

  killKeypress() {
    // console.log("keypress should be killed");
    $(document).off();
    this.setState({
      tryingToName: true,
    });
  }

  addKeypress() {
    // console.log("Keypress should be enabled");
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
            <h2 className="step">Click your instrument to play!</h2>
            <div id="testPiano" onClick={this.addKeypress} >
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
