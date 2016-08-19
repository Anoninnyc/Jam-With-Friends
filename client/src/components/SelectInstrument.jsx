import React from 'react';
import Carousel from 'nuka-carousel';
import RaisedButton from 'material-ui/RaisedButton';

const SelectInstrument = ({ handleSelect, handleClick }) => {
  const fixCarouselHeight = () => { window.dispatchEvent(new Event('resize')); };
  return (
    <div style={{ textAlign: "center" }}>
      <Carousel
        afterSlide={handleSelect}
        InitialSlideWidth="500px"
        InitialSlideHeight="350px"
        width="500px"
        framePadding="0px 60px"
        style={{ margin: "auto" }}
        wrapAround
      >
        <img
          src="/assets/piano.svg"
          alt="piano"
          onLoad={fixCarouselHeight}
        />
        <img
          src="/assets/drums.svg"
          alt="drums"
          onLoad={fixCarouselHeight}
        />
        <img
          src="/assets/synth.svg"
          alt="laserbells"
          onLoad={fixCarouselHeight}
        />
      </Carousel>
      <RaisedButton label="Start" onTouchTap={handleClick} style={{ margin: "auto" }} />
    </div>
  );
};

SelectInstrument.propTypes = {
  handleSelect: React.PropTypes.func.isRequired,
  handleClick: React.PropTypes.func.isRequired
};

// SelectInstrument.childContextTypes = {
//   muiTheme: React.PropTypes.object.isRequired,
// };

export default SelectInstrument;
