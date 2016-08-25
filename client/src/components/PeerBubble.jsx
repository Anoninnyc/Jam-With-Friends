import React from 'react';
import IconButton from 'material-ui/IconButton';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import { white } from 'material-ui/styles/colors';
import InstrumentIcon, { KickDrumIcon } from '../icons';

const PeerBubble = ({ peer, handleClick, self, extraInstruments }) => (

  <div className="peer">
    <KickDrumIcon style={{ width: 200, height: 'auto' }} />
    {
      peer.instrument ?
        <div>
          <InstrumentIcon
            instrument={peer.instrument}
            className="jamroom-instrument"
            style={{ width: '100%', height: 80 }}
            color={white}
            onTouchTap={self ? handleClick : () => {}}
          />
          <p className="peer-name">{peer.name}</p>
        </div> :
        <div>
          <p className="peer-name">Invite</p>
          <IconButton
            iconStyle={{ height: 50, width: 50 }}
            style={{ width: '100%', height: 'auto', padding: 25, position: 'absolute', bottom: 50, left: 5 }}
            onTouchTap={handleClick}
          >
            <AddCircleOutline className="circleIcon" color={white} />
          </IconButton>
        </div>
    }
  </div>
);


PeerBubble.propTypes = {
  peer: React.PropTypes.object.isRequired,
  handleClick: React.PropTypes.func.isRequired,
  self: React.PropTypes.bool,
  extraInstruments: React.PropTypes.array
};

export default PeerBubble;
