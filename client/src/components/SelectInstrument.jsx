import React from 'react';
import Carousel from 'nuka-carousel';
import RaisedButton from 'material-ui/RaisedButton';

import { instruments } from '../instruments/store';

const SelectInstrument = ({ handleSelect, handleClick, size, ownInstrument, extraInstruments }) => {
  console.log('you also have these instruments', extraInstruments);
  size = size || 'normal';
  const fixCarouselHeight = () => { window.dispatchEvent(new Event('resize')); };
  const styleSize = {
    normal: {
      width: "500px",
      height: "350px",
      buttonText: "Start"
    },
    inset: {
      width: "400px",
      height: "310px",
      buttonText: "Done"
    }
  };
  let startIndex = 0;
  if (ownInstrument) {
    while (instruments[startIndex] !== ownInstrument) {
      startIndex++;
    }
  }
  return (
    <div style={{ textAlign: "center" }}>
      <Carousel
        slideIndex={startIndex}
        afterSlide={handleSelect}
        InitialSlideWidth={styleSize[size].width}
        InitialSlideHeight={styleSize[size].height}
        width={styleSize[size].width}
        framePadding="0px 60px"
        style={{ margin: "auto" }}
        wrapAround
      >
        {
          instruments.concat(extraInstruments.map(a => {
          return `Your Instrument: ${a.instrumentName}`;
          })).map(instrument => (
            <img
              src={`/assets/${instrument}.svg`}
              alt={instrument}
              onLoad={fixCarouselHeight}
              key={instrument}
            />
          ))
        }
      </Carousel>
      <RaisedButton label={styleSize[size].buttonText} onTouchTap={handleClick} style={{ margin: "auto" }} />
    </div>
  );
};

SelectInstrument.propTypes = {
  handleSelect: React.PropTypes.func.isRequired,
  handleClick: React.PropTypes.func.isRequired,
  size: React.PropTypes.string,
  ownInstrument: React.PropTypes.string,
  extraInstruments: React.PropTypes.array.isRequired,
};

// SelectInstrument.childContextTypes = {
//   muiTheme: React.PropTypes.object.isRequired,
// };

export default SelectInstrument;