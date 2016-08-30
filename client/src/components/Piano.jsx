import React, { Component } from 'react';
import AudioSynth from 'audiosynth';
const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();
const Synth = new AudioSynth(context);
Synth.setOscWave(1);

class Piano extends Component {

  render() {
    const oneTen= [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const teens= ["thir", "fourt", "fift", "sixt", "sevent", "eight", "ninet"];
    return (
      <div id="userPiano">

  {oneTen.map(num => (
    <div className="key" id={num} />
    ))}

 {teens.map(num => (
   <div className="blackKey" id={num} />
    ))}

      </div>
);
  }
}
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
  if (e.which === 97) {
    keyHelper("#1");
  } else if (e.which=== 115) {
    keyHelper("#2");
  } else if (e.which=== 100) {
    keyHelper("#3");
  } else if (e.which=== 102) {
    keyHelper("#4");
  } else if (e.which=== 103) {
    keyHelper("#5");
  } else if (e.which=== 104) {
    keyHelper("#6");
  } else if (e.which=== 106) {
    keyHelper("#7");
  } else if (e.which=== 107) {
    keyHelper("#8");
  } else if (e.which=== 108) {
    keyHelper("#9");
  } else if (e.which=== 59) {
    keyHelper("#10");
  } else if (e.which=== 39) {
    keyHelper("#11");
  } else if (e.which=== 13) {
    keyHelper("#12");
  } else if (e.which=== 119) {
    blackKeyHelper("#thir");
  } else if (e.which=== 101) {
    blackKeyHelper("#fourt");
  } else if (e.which=== 116) {
    blackKeyHelper("#fift");
  } else if (e.which=== 121) {
    blackKeyHelper("#sixt");
  } else if (e.which=== 117) {
    blackKeyHelper("#sevent");
  } else if (e.which===111) {
    blackKeyHelper("#eight");
  } else if (e.which=== 112) {
    blackKeyHelper("#ninet");
  } else if (e.which=== 93) {
    blackKeyHelper("#twenty");
  } else if (e.which=== 13) {
    keyHelper("#12");
  } else if (e.which=== 112) {
    keyHelper("#12");
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

