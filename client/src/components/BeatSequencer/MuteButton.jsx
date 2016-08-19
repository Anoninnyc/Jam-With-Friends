import React from 'react';
import IconButton from 'material-ui/IconButton';

const MuteButton = ({ isMute, handleClick }) => {
  return (
    <div className="muteButton" onClick={handleClick}>
      <IconButton
        iconClassName="material-icons"
      >
        { isMute ? "volume_up" : "volume_off" }
      </IconButton>
    </div>
  );
};

export default MuteButton;
