import React from 'react';
import Popover from 'material-ui/Popover';
import IconButton from 'material-ui/IconButton';

const EditSequence = ({ handleOpen, showPopover, anchorEl, handleClose }) => (
  <div className="editSequence">
    <IconButton
      iconClassName="material-icons"
      iconStyle={{ height: 48, width: 48 }}
      onTouchTap={handleOpen}
    >
      create
    </IconButton>
    <Popover
      open={showPopover}
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      targetOrigin={{ horizontal: 'left', vertical: 'top' }}
      onRequestClose={handleClose}
      canAutoPosition={false}
    >
      <p>Edit the sequence</p>
    </Popover>
  </div>
);

EditSequence.propTypes = {
  handleOpen: React.PropTypes.func.isRequired,
  showPopover: React.PropTypes.bool.isRequired,
  anchorEl: React.PropTypes.object,
  handleClose: React.PropTypes.func.isRequired
};

export default EditSequence;
