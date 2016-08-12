import React, { Component } from 'react';


class Piano extends Component {

  render() {
    return (
      <div>
        <div className="key" id="1" />
        <div className="key" id="2" />
        <div className="key" id="3" />
        <div className="key" id="4" />
        <div className="key" id="5" />
      </div>
    );
  }
}

function keyHelper(ID) {
  $(ID).animate({
    backgroundColor: "black",
  }, 100).animate({
    backgroundColor: "white",
  }, 100);
}


$(document).keypress(function key(e) {
  if (e.which === 113) {
    keyHelper("#1");
  } else if (e.which=== 119) {
    keyHelper("#2");
  } else if (e.which=== 101) {
    keyHelper("#3");
  } else if (e.which=== 114) {
    keyHelper("#4");
  } else if (e.which=== 116) {
    keyHelper("#5");
  }
});

export default Piano;
