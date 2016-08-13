import React from 'react';

const SelectInstrument = ({ handleClick, opacity }) => (
  <div id="selectInstrumentRoom">
    <div>
      <img
        id="instLogo"
        src="../../../style/InstrumentRoomLogo.png"
        alt="logo"
      />
    </div>
    <div className={opacity('piano')}>
      <img
        id="pianoChoose"
        src="http://handlinpiano2.codyhandlin.com/wp-content/uploads/2016/06/grandepiano_2.png"
        alt="piano"
        onClick={handleClick.bind(null, 'piano')}
      />
    </div>
    <div className={opacity('drums')}>
      <img
        id="drumsChoose"
        src="http://www.vancouvertop40radio.com/Images/Clip%20Art/drumset.gif"
        alt="drums"
        onClick={handleClick.bind(null, 'drums')}
      />
    </div>
    <div className={opacity('fry')}>
      <img
        id="fryChoose"
        src="http://i.stack.imgur.com/STEuc.png"
        alt="fry"
        onClick={handleClick.bind(null, 'fry')}
      />
    </div>
  </div>
);

SelectInstrument.propTypes = {
  handleClick: React.PropTypes.func.isRequired,
  opacity: React.PropTypes.func
};

// SelectInstrument.childContextTypes = {
//   muiTheme: React.PropTypes.object.isRequired,
// };

export default SelectInstrument;
