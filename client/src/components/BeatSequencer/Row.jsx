import React from 'react';
import classnames from 'classnames';

/**
 * - receives props from parent `Sequence`
 * - renders each subdivision of the beat
 */
const Row = ({ sound, sequence, handleClick }) => {

  const renderBeat = (beat, index) => {
    const beatStyle = classnames({ selected: beat === 1 }, 'beatBox');
    const _handleClick = handleClick.bind(null, index);

    return (
      <div className={beatStyle} id={index} onClick={_handleClick}></div>
    )
  };

  return (
    <div className="beatSequence row">
      { sequence.map((beat, index) => renderBeat(beat, index)) }
    </div>
  );
};

export default Row;
