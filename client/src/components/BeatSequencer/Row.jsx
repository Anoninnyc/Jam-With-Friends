import React from 'react';

/**
 * - receives props from parent `Sequence`
 * - renders each subdivision of the beat
 */
const Row = ({ sound, sequence }) => {
  return (
    <div className="beatSequence row">
      <div className="beatBox"></div>
      <div className="beatBox"></div>
      <div className="beatBox"></div>
      <div className="beatBox"></div>
    </div>
  );
};

export default Row;
