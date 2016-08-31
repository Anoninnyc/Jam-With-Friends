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
