// Modules
import React from 'react';
// Material.UI
import PeerBubble from './PeerBubble';

const PeerBar = ({ peers, toggleInviteView, toggleSelectView, extraInstruments }) => {
  const inviteNumber = 4 - peers.length;
  const inviteArray = [];
  for (let i = 0; i < inviteNumber; i++) {
    inviteArray.push(i);
  }
  return (
    <div className="peer-bar">
      {
        peers.map((peer, index) => (
          <div key={peer.peerId}>
            <PeerBubble extraInstruments={extraInstruments} peer={peer} handleClick={toggleSelectView} self={index === 0} />
          </div>
        ))
      }
      {
        inviteArray.map(index => (
          <div key={index}>
            <PeerBubble peer={{}} handleClick={toggleInviteView} />
          </div>
        ))
      }
    </div>
  );
};

PeerBar.propTypes = {
  peers: React.PropTypes.array.isRequired,
  toggleInviteView: React.PropTypes.func.isRequired,
  toggleSelectView: React.PropTypes.func.isRequired
};

export default PeerBar;
