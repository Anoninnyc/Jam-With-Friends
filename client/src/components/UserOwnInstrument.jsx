import React, { Component } from 'react';
const keys=["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const UserOwnInstrument = () => (
  <div>
   {keys.map((key, idx) => (
     <div className="key" id={idx+1}>{key}</div>
    ))}
  </div>
  );

export default UserOwnInstrument;


 // <div className="key" id="1" >A</div>
 //    <div className="key" id="2" >S</div>
 //    <div className="key" id="3" >D</div>
 //    <div className="key" id="4" >F</div>
 //    <div className="key" id="5" >G</div>
 //    <div className="key" id="6" >H</div>
 //    <div className="key" id="7" >J</div>
 //    <div className="key" id="8" >K</div>
 //    <div className="key" id="9" >L</div>