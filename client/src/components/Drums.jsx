// Modules
import React, { Component } from 'react';
import { animateInst, mapDrumIDToSounds, drumParts } from '../utils/helperFunctions';
import { store } from '../instruments/store';
import connectionManager from '../rtc';

class Drums extends Component {

  helper(ID) {
    store.drums(mapDrumIDToSounds[ID]);
    animateInst(ID, "silver", "transparent", 50);
    connectionManager.sendMessage(JSON.stringify({
      instrument: "drums",
      idToPlay: mapDrumIDToSounds[ID],
    }));
  }

  render() {
    return (
      <div id="userDrums">
        <img id="cs" src="../../../assets/completeSet.png" />
        {drumParts.map(drumName => (
          <div onClick={() => { this.helper(`#${drumName}`); }} id={drumName} />
         ))}
      </div>
    );
  }
}

export default Drums;
