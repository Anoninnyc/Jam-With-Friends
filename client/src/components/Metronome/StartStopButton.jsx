import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const StartStopButton = ({ toggle }) => {
  const handleTouch = () => {
    toggle();
  };

  return (
    <RaisedButton
      label="Toggle"
      onTouchTap={handleTouch}
    />
  );
};

StartStopButton.propTypes = {
  toggle: React.PropTypes.func.isRequired
};

export default StartStopButton;
