// Modules
import React, { Component } from 'react';
import { animateInst, mapDrumIDToSounds, drumParts } from '../utils/helperFunctions';
import { store } from '../instruments/store';

class Drums extends Component {

  helper(ID) {
    store.drums(mapDrumIDToSounds[ID]);
    animateInst(ID, "silver", "transparent", 50);
  }

  render() {
    return (
      <div id="userDrums">
        <img id="cs" src="../../../style/DrumParts/completeSet.png" />
        {drumParts.map(drumName => (
          <div onClick={() => { this.helper(`#${drumName}`); }} id={drumName} />
         ))}
      </div>
    );
  }
}

export default Drums;
