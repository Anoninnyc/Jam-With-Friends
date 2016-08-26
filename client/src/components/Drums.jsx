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
      <div id="userDrums">
        <img id="cs" src="../../../style/DrumParts/completeSet.png" />
	      <div onClick={() => { this.helper("#urC"); }} id="urC" />
	      <div onClick={() => { this.helper("#nextC"); }} id="nextC" />
	      <div onClick={() => { this.helper("#brDrum"); }} id="brDrum" />
	      <div onClick={() => { this.helper("#rsDrum"); }} id="rsDrum" />
	      <div onClick={() => { this.helper("#lsDrum"); }} id="lsDrum" />
	      <div onClick={() => { this.helper("#tomDrum"); }} id="tomDrum" />
	      <div onClick={() => { this.helper("#urCymbal"); }} id="urCymbal" />
      </div>
    );
  }
}

export default Drums;
