import React from 'react';
import Slider from 'material-ui/Slider';

const TempoSlider = ({ bpm, changeBPM }) => (
  <Slider
    defaultValue={bpm}
    description="Change the tempo"
    min={40}
    max={240}
    step={2}
    onChange={changeBPM}
    value={bpm}
  />
);

TempoSlider.propTypes = {
  bpm: React.PropTypes.string.isRequired,
  changeBPM: React.PropTypes.function.isRequired
};

export default TempoSlider;
