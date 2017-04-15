import React from 'react';
import { keys } from '../utils/helperFunctions';

const UserOwnInstrument = props => (

  <div>
    {keys.map((key, idx) => {
      let isActive="";
      if (props.activeKeys) {
        isActive = props.activeKeys[idx+1]?"highlightedBorderKey":"";
      }
      return <div className={`key ${isActive}`} key={idx+1} id={idx+1}>{key}</div>;
    })}
  </div>

 );

export default UserOwnInstrument;

UserOwnInstrument.propTypes = {
  activeKeys: React.PropTypes.object,
};
