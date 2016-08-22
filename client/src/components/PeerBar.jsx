import React from 'react';

import PeerBubble from './PeerBubble';

const PeerBar = ({ ownInstrument, peers, toggleInviteView, toggleSelectView }) => {
  const inviteNumber = 3 - peers.length;
  const inviteArray = [];
  for (let i = 0; i < inviteNumber; i++) {
    inviteArray.push(i);
  }
  return (
    <div className="peer-bar">
      <PeerBubble peer={{ instrument: ownInstrument, name: 'Me' }} handleClick={toggleSelectView} />
      {
        peers.map(peer => (
          <div key={peer.peerId}>
            <PeerBubble peer={peer} />
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
  ownInstrument: React.PropTypes.string.isRequired,
  peers: React.PropTypes.array.isRequired,
  toggleInviteView: React.PropTypes.func.isRequired,
  toggleSelectView: React.PropTypes.func.isRequired
};

export default PeerBar;
