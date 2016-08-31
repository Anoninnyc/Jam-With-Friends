import React, { Component } from 'react';
import AudioSynth from 'audiosynth';

const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();
const Synth = new AudioSynth(context);
Synth.setOscWave(1);
import { mapPianoKeyPress, mapBlackPianoKeyPress } from '../utils/helperFunctions';


const oneTen= [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const teens= ["thir", "fourt", "fift", "sixt", "sevent", "eight", "ninet"];

const Piano = () => (

  <div id="userPiano">

  {oneTen.map(num => (
    <div className="key" id={num} />
    ))}

 {teens.map(num => (
   <div className="blackKey" id={num} />
    ))}

  </div>
);

// <div className="key" id="12" />

function keyHelper(ID) {
  $(ID).animate({
    backgroundColor: "black",
  }, 20).animate({
    backgroundColor: "white",
  }, 20);
}

function blackKeyHelper(ID) {
  $(ID).animate({
    backgroundColor: "white",
  }, 20).animate({
    backgroundColor: "black",
  }, 20);
}

$(document).keypress((e) => {
  if (mapPianoKeyPress[e.which]) {
    keyHelper(mapPianoKeyPress[e.which]);
  } else if (mapBlackPianoKeyPress[e.which]) {
    blackKeyHelper(mapBlackPianoKeyPress[e.which]);
  }
});

export default Piano;


   // <div className="key" id="1" />
   //      <div className="key" id="2" />
   //      <div className="key" id="3" />
   //      <div className="key" id="4" />
   //      <div className="key" id="5" />
   //      <div className="key" id="6" />
   //      <div className="key" id="7" />
   //      <div className="key" id="8" />
   //      <div className="key" id="9" />
   //      <div className="key" id="10" />

