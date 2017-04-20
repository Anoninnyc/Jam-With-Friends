import React, { Component } from 'react';
import AudioSynth from 'audiosynth';
import { mapPianoKeyPress, mapBlackPianoKeyPress, animateInst, oneTen, teens } from '../utils/helperFunctions';


const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();
const Synth = new AudioSynth(context);
Synth.setOscWave(1);

const Piano = () => (

  <div id="userPiano">

    {oneTen.map(num => (
      <div key={num} className="key" id={num} />
    ))}

    {teens.map(num => (
      <div key={num} className="blackKey" id={num} />
    ))}
    <div className="instInstructions"> Play piano using your keyboard </div>

  </div>
);

$(document).keypress((e) => {
  if (mapPianoKeyPress[e.which]) {
    animateInst(mapPianoKeyPress[e.which], "black", "white", 20);
  } else if (mapBlackPianoKeyPress[e.which]) {
    animateInst(mapBlackPianoKeyPress[e.which], "white", "black", 20);
  }
});

export default Piano;
