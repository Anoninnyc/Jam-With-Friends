// Modules
import React from 'react';
import Popover from 'material-ui/Popover';
import IconButton from 'material-ui/IconButton';

const Help = ({ handleOpen, showPopover, anchorEl, handleClose }) => (
  <div className="helpButton">
    <IconButton
      iconClassName="material-icons"
      iconStyle={{ height: 48, width: 48 }}
      style={{ height: 96, width: 96, padding: 24 }}
      onTouchTap={handleOpen}
    >
      help_outline
    </IconButton>
    <Popover
      open={showPopover}
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      targetOrigin={{ horizontal: 'left', vertical: 'top' }}
      onRequestClose={handleClose}
      canAutoPosition={false}
    >
      <p style={{ height: 350, width: 250, margin: 20, textAlign: 'center', display: 'inline-block' }}>
        Select an instrument to play and press start when you are ready.
        Use your keyboard to play your instrument.
        Invite your friends to jam with you by clicking on the &#xFF0B; symbol and sharing the link.
      </p>
    </Popover>
  </div>
);

Help.propTypes = {
  handleOpen: React.PropTypes.func.isRequired,
  showPopover: React.PropTypes.bool.isRequired,
  handleClose: React.PropTypes.func.isRequired,
  anchorEl: React.PropTypes.object
};

export default Help;
