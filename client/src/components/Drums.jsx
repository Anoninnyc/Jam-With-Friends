import React, { Component } from 'react';

class Drums extends Component {
  helper(ID) {
    $(ID).animate({
      backgroundColor: "silver",
    }, 50).animate({
      backgroundColor: "transparent"
    }, 50);
  }
  render() {
    return (
      <div id = "userDrums">
        <img id = "cs" src="../../../style/DrumParts/completeSet.png" />
	      <div onClick={() => { console.log('ll'), this.helper("#urC"); }} id="urC" />
	      <div onClick={() => { console.log('ll'), this.helper("#nextC"); }} id="nextC" />
	      <div onClick={() => { console.log('ll'), this.helper("#brDrum"); }} id="brDrum" />
	      <div onClick={() => { console.log('ll'),this.helper("#rsDrum"); }} id="rsDrum" />
	      <div onClick={() => { console.log('ll'),this.helper("#lsDrum"); }} id="lsDrum" />
	      <div onClick={() => { console.log('ll'),this.helper("#tomDrum"); }} id="tomDrum" />
	      <div onClick={() => { console.log('ll'), this.helper("#urCymbal"); }} id="urCymbal" />
      </div>
    );
  }
}

export default Drums;
