import React, { Component } from 'react';


class Piano extends Component {

  render() {
    console.log(document.getElementById("thir"))
    return (
      
      <div>
        <div className="key" id="1" />
        <div className="key" id="2" />
        <div className="key" id="3" />
        <div className="key" id="4" />
        <div className="key" id="5" />
        <div className="key" id="6" />
        <div className="key" id="7" />
        <div className="key" id="8" />
        <div className="key" id="9" />
        <div className="key" id="10" />
        <div className="key" id="11" />
        <div className="key" id="12" />
        <div className="blackKey" id="thir" />
        <div className="blackKey" id="fourt" />
        <div className="blackKey" id="fift" />
        <div className="blackKey" id="sixt" />
        <div className="blackKey" id="sevent" />
        <div className="blackKey" id="eight" />
        <div className="blackKey" id="ninet" />
        <div className="blackKey" id="twenty" />

      </div>
     
      
    );
  }
}

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


$(document).keypress(function key(e) {
  console.log(e.which);
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
  }
    else if (e.which=== 119) {
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
