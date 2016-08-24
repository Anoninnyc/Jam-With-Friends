import React from 'react';

import PeerBubble from './PeerBubble';

const PeerBar = ({ peers, toggleInviteView, toggleSelectView }) => {
  console.log('peers', peers);
  const inviteNumber = 4 - peers.length;
  const inviteArray = [];
  for (let i = 0; i < inviteNumber; i++) {
    inviteArray.push(i);
  }
  return (
    <div className="peer-bar">
      {
        peers.map((peer, index) => {
          console.log('peer & index', peer, index);
          return (<div key={peer.peerId}>
            <PeerBubble peer={peer} handleClick={toggleSelectView} self={index === 0} />
          </div>
        );
        })
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
