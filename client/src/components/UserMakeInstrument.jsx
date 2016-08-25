// Tones
import React, { Component } from 'react';
import { MembraneSynth } from "tone";
// Components
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import UserOwnInstrument from './UserOwnInstrument';
// Utils
import { showErrorMessage, mapIdsToKeys, mapKeysToIds, envelopeValue } from '../utils/helperFunctions';

class UserMakeInstrument extends Component {

  constructor(props) {
    super(props);
    this.handleNoteChange=this.handleNoteChange.bind(this);
    this.handleKeyChange=this.handleKeyChange.bind(this);
    this.handleOctaveChange=this.handleOctaveChange.bind(this);
    this.handlePDChange=this.handlePDChange.bind(this);
    this.handleTypeChange=this.handleTypeChange.bind(this);
    this.deleteKey = this.deleteKey.bind(this);
    this.mapThat = this.mapThat.bind(this);
    this.changeInst = this.changeInst.bind(this);
    this.killKeypress = this.killKeypress.bind(this);
    this.addKeypress = this.addKeypress.bind(this);
    this.logIn = this.props.logIn.bind(this);
    this.makeInstrument = this.makeInstrument.bind(this);
    this.state = {
      noteValue: "A",
      keyValue: "A",
      octaveValue: 1,
      PDValue: 0.1,
      typeValue: "sine",
      inMemObject: {},
      instrument: "MembraneSynth",
      tryingToName: true,

    };
  }


  componentDidMount() {
    $('.sampleSound').click(() => {
      this.sampleSound();
    });

    $.get("/getUserInfo", (resp, err) => {
      console.log('this the the resp to userloggedintomakeinst', resp);
      if (resp[0] === null) {
        console.log('youre not logged in!');
        this.context.router.push("login");
      }
    });
  }

  componentWillUnmount() {
    $(document).off();
  }

  keyHelper(ID) {
  //  console.log(this.state.tryingToName);
    if (!this.state.tryingToName) {
      console.log(ID, mapIdsToKeys[ID], this.state.inMemObject);
      const keyInfo = JSON.parse(this.state.inMemObject[mapIdsToKeys[ID]]);
      if (keyInfo === undefined) {
        showErrorMessage("#makeInstErrorMessages", 'Please Map To This Key', 'nonExistentMapError');
      } else {
        this.setState({
          noteValue: keyInfo[1],
          octaveValue: keyInfo[2],
          PDValue: keyInfo[3],
          typeValue: keyInfo[4],
        });

        this.sampleSound();

        $(ID).animate({
          backgroundColor: "black",
        }, 20).animate({
          backgroundColor: "white",
        }, 20);
      }
    }
  }

  sampleSound() {
    const par1 = this.state.noteValue;
    const par2 = this.state.octaveValue;
    const par3 = this.state.PDValue;
    const par4 = this.state.typeValue;
    const combo = `${par1}${par2}`;
    const config = {
      pitchDecay: par3||0.1,
      octaves: 7,
      oscillator: {
        type: par4,
      },
      envelope: envelopeValue
    };
    const zimit = new MembraneSynth(config).toMaster();
    zimit.triggerAttackRelease(combo, '8n');
  }

  mapThat() {
    console.log(this.state.noteValue);
    const par1 = this.state.noteValue;
    const par2 = this.state.octaveValue;
    const par3 = this.state.PDValue;
    const par4 = this.state.typeValue;
    const key = this.state.keyValue;
    const inst = "N/A";
    const currentInMemObj = this.state.inMemObject;
    currentInMemObj[key] = JSON.stringify([inst, par1, par2, par3, par4]);
    if (!par1&&!par2&&!par3&&!par4) {
     // console.log('please make a proper mapping');
      showErrorMessage("#makeInstErrorMessages", 'Please make a Proper Mapping', 'propMapError');
    } else {
      this.setState({
        noteValue: "A",
        octaveValue: 1,
        PDValue: 0.1,
        typeValue: "sine",
        inMemObject: currentInMemObj
      });
      console.log(currentInMemObj);
      const idToAdd = mapKeysToIds[key];
      $(idToAdd).css("border", "5px solid blue");
    }
  }


  makeInstrument() {
    const name = this.refs.instName.getValue();
    const currentInMemObj = this.state.inMemObject;
    currentInMemObj.name = name;
    currentInMemObj.userName = this.props.user;
    let empty = true;
    for (const key in currentInMemObj) {
      if (key.length === 1) {
       // console.log('a key exists!');
        empty = false;
      }
    }
    if (name.length === 0) {
      showErrorMessage("#makeInstErrorMessages", 'Pls name your instrument', 'npo');
    //  console.log('you need to name it something!');
    } else if (empty) {
      showErrorMessage("#makeInstErrorMessages", 'Pls map some keys', 'npi');
     // console.log('youve not mapped any keys!!!');
    } else if (/\W/.test(name)===true) {
      showErrorMessage("#makeInstErrorMessages", 'Letters and numbers only please!', 'regexErr');
    } else {
      this.setState({
        inMemObject: {}
      });
      empty = true;
      this.props.socket.emit('newInstCreated', currentInMemObj);
      console.log(`youve created ${currentInMemObj}`);
      const final = this.props.userInstruments.concat([currentInMemObj]);
      this.props.updateUserInstrument(final);
      showErrorMessage("#makeInstErrorMessages", 'InstrumentMade!', 'makeThat');
      $("#par1").val("A");
      $("#par2").val("1");
      $("#par3").val("0.1");
      $("#par4").val("sine");
      $(".key").css("border", "2px solid black");
    }
  }

  deleteKey() {
    const keyToDelete = this.state.keyValue;
    // console.log( "you want to delete"+ $(".selectKey option:selected").text());
    const newInMemObj = this.state.inMemObject;
    delete newInMemObj[keyToDelete];
    this.setState({
      inMemObject: newInMemObj,
    });

    const idToClear = mapKeysToIds[keyToDelete];
  //  console.log('idToAdd', idToClear);
    $(idToClear).css("border", "2px solid black");
  }

  handleNoteChange(event, index, value) {
    console.log(value);
    this.setState({ noteValue: value });
  }
  handleKeyChange(event, index, value) {
    console.log(value);
    this.setState({ keyValue: value });
  }

  handleOctaveChange(event, index, value) {
    console.log(value);
    this.setState({ octaveValue: value });
  }
  handleTypeChange(event, index, value) {
    console.log(value);
    this.setState({ typeValue: value });
  }

  handlePDChange(event, index, value) {
    console.log(value);
    this.setState({ PDValue: value });
  }

  killKeypress() {
    console.log("keypress should be killed");
    $(document).off();
    $(document).off("keypress");
    this.setState({
      tryingToName: true,
    });
  }

  addKeypress() {
    console.log(this, 'this in addkeypress');
    console.log("keypress should be enabled");
    if (this.state.tryingToName) {
      $(document).keypress((e) => {
        if (e.which === 97) {
          this.keyHelper("#1");
        } else if (e.which === 115) {
          this.keyHelper("#2");
        } else if (e.which === 100) {
          this.keyHelper("#3");
        } else if (e.which === 102) {
          this.keyHelper("#4");
        } else if (e.which === 103) {
          this.keyHelper("#5");
        } else if (e.which === 104) {
          this.keyHelper("#6");
        } else if (e.which === 106) {
          this.keyHelper("#7");
        } else if (e.which === 107) {
          this.keyHelper("#8");
        } else if (e.which === 108) {
          this.keyHelper("#9");
        }
      });
      this.setState({
        tryingToName: false,
      });
    }
  }

  changeInst() {
    console.log("inst changed");
    $(".par").val("");
    const inst = $(".selectInst option:selected").text();
    this.setState({
      instrument: inst
    });
  }

  render() {
    const keys =["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const octaves = [1, 2, 3, 4, 5, 6, 7];
    return (
      <div id="UserMakeInstrumentRoom">
        <h1>Make Instrument Here!</h1>
        <div id="currentInst" /> <br />
        <div className="selectKey" id="selectKeys_${id}">
          <h1>Step One: Select a Key to map to </h1>
          <DropDownMenu
            value={this.state.keyValue}
            onChange={this.handleKeyChange}
            autoWidth={false}
          >
            <MenuItem value={"A"} primaryText="A" />
            <MenuItem value={"S"} primaryText="S" />
            <MenuItem value={"D"} primaryText="D" />
            <MenuItem value={"F"} primaryText="F" />
            <MenuItem value={"G"} primaryText="G" />
            <MenuItem value={"H"} primaryText="H" />
            <MenuItem value={"J"} primaryText="J" />
            <MenuItem value={"K"} primaryText="K" />
            <MenuItem value={"L"} primaryText="L" />
          </DropDownMenu>
        </div>
        <RaisedButton label="Delete Key Mapping" onClick={this.deleteKey} /><br />
        <h2>Step Two: Set Your Parameters</h2><br />

        Note
        <DropDownMenu
          value={this.state.noteValue}
          onChange={this.handleNoteChange}
          autoWidth={false}
        >
          <MenuItem value={"A"} primaryText="A" />
          <MenuItem value={"B"} primaryText="B" />
          <MenuItem value={"C"} primaryText="C" />
          <MenuItem value={"D"} primaryText="D" />
          <MenuItem value={"E"} primaryText="E" />
          <MenuItem value={"F"} primaryText="F" />
          <MenuItem value={"G"} primaryText="G" />
        </DropDownMenu>


        Octave
        <DropDownMenu
          value={this.state.octaveValue}
          onChange={this.handleOctaveChange}
          autoWidth={false}
        >
          <MenuItem value={1} primaryText="1" />
          <MenuItem value={2} primaryText="2" />
          <MenuItem value={3} primaryText="3" />
          <MenuItem value={4} primaryText="4" />
          <MenuItem value={5} primaryText="5" />
          <MenuItem value={6} primaryText="6" />
          <MenuItem value={7} primaryText="7" />  
        </DropDownMenu>

        Pitch Decay
        <DropDownMenu
          value={this.state.PDValue}
          onChange={this.handlePDChange}
          autoWidth={false}
        >
          <MenuItem value={0.1} primaryText="0.1" />
          <MenuItem value={0.2} primaryText="0.2" />
          <MenuItem value={0.3} primaryText="0.3" />
          <MenuItem value={0.4} primaryText="0.4" />
          <MenuItem value={0.5} primaryText="0.5" />
          <MenuItem value={0.6} primaryText="0.6" />
          <MenuItem value={0.7} primaryText="0.7" />
        </DropDownMenu>

        Sound Type
        <DropDownMenu
          value={this.state.typeValue}
          onChange={this.handleTypeChange}
          autoWidth={false}
        >
          <MenuItem value={"sine"} primaryText="sine" />
          <MenuItem value={"square"} primaryText="square" />
          <MenuItem value={"sawtooth"} primaryText="sawtooth" />
          <MenuItem value={"triangle"} primaryText="triangle" />
        </DropDownMenu> <br />
        <h1> Step Three </h1>
        <RaisedButton label="Map Sound to Key" onClick={this.mapThat} /><br />
        <TextField
          onClick={this.killKeypress}
          ref="instName"
          hintText="Only Letters and Numbers Please"
          floatingLabelText="Name your Instrument"
        />
        <br />

        <RaisedButton label="Make the instrument broh" style={{ postion: "absolute", top: "50%" }} onClick={this.makeInstrument} /><br />
        <br />
        Your current Instrument in Piano form (click to play):
        <div id="testPiano" onClick={this.addKeypress} >
          <UserOwnInstrument />
        </div>
        <div id="makeInstErrorMessages" />
      </div>
    );
  }
}

UserMakeInstrument.propTypes = {
  params: React.PropTypes.object,
  logIn: React.PropTypes.func,
  userInstruments: React.PropTypes.array,
  updateUserInstrument: React.PropTypes.func,
  user: React.PropTypes.object,
};

UserMakeInstrument.contextTypes = {
  router: React.PropTypes.object
};


UserMakeInstrument.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
export default UserMakeInstrument;
