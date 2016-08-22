import React from 'react';
import IconButton from 'material-ui/IconButton';

const PlayStopButton = ({ isPlaying, handleClick }) => {
  return (
    <div className="playStopButton" onClick={handleClick}>
      <IconButton
        iconClassName="material-icons"
      >
        { isPlaying ? "stop" : "play_arrow" }
      </IconButton>
    </div>
  );
};

export default PlayStopButton;
