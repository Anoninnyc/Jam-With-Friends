import React from 'react';

import PeerBubble from './PeerBubble';

const PeerBar = ({ peers, toggleInviteView }) => (
  <div className="peer-bar">
    {
      [true, false, true, false].map((peer, index) => (
        <div key={index}>
          <PeerBubble peer={peer} handleClick={toggleInviteView} />
        </div>
      ))
    }
  </div>
);

PeerBar.propTypes = {
  peers: React.PropTypes.array.isRequired,
  toggleInviteView: React.PropTypes.func.isRequired
};

export default PeerBar;
