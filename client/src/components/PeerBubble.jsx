import React from 'react';
import IconButton from 'material-ui/IconButton';

const PeerBubble = ({ peer, handleClick }) => (
  <div className="peer">
    <img src="/assets/kick.svg" alt="kick drum" />
    {
      peer ?
        <div>
          <img src="/assets/piano.svg" className="jamroom-instrument" alt={peer.instrument} />
          <p className="peer-name">You</p>
        </div> :
        <div>
          <p className="peer-name">Invite</p>
          <IconButton
            className="invitePeer"
            iconClassName="material-icons"
            iconStyle={{ height: 60, width: 60 }}
            style={{ height: 120, width: 120, padding: 30, position: 'absolute', bottom: '100px', left: '65px' }}
            onTouchTap={handleClick}
          >
            add_circle_outline
          </IconButton>
        </div>
    }
  </div>
);

PeerBubble.propTypes = {
  peer: React.PropTypes.object.isRequired,
  handleClick: React.PropTypes.func.isRequired
};

export default PeerBubble;
