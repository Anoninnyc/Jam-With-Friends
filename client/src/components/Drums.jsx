import React, { Component } from 'react';
import { Buffer } from "tone";
// import { mapDrumIDToSounds } from '../utils/helperFunctions';

class Drums extends Component {
  helper(ID) {
// Run mapDrumIDToSounds
// document.getElementById('audiotag1').play();

    $(ID).animate({
      backgroundColor: "silver",
    }, 50).animate({
      backgroundColor: "transparent"
    }, 50);
  }

  render() {
    const drumParts=["urC", "nextC", "brDrum", "rsDrum", "lsDrum", "tomDrum", "urCymbal", "kickDrum"];
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


// <audio id="audiotag1">
//         <source src="http://www.freesfx.co.uk/rx2/mp3s/3/15442_1460468286.mp3"/>
//       </audio>
//       <audio id="audiotag2">
//         <source src="http://www.freesfx.co.uk/rx2/mp3s/2/14309_1459962858.mp3"/>
//       </audio>
