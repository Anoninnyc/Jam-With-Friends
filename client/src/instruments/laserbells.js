import basso from './sounds/basso';
import wimbal from './sounds/wimbal';
import zwill from './sounds/zwill';

const lowKeys = new Set('asdfgh');

// zimits
const midKeys = new Set('zxcvbnmjkl');

const playNote = keyPressed => {
  // coerce to string
  keyPressed += '';

  if (lowKeys.has(keyPressed)) {
    basso(keyPressed);
  } else if (midKeys.has(keyPressed)) {
    zwill(keyPressed);
  } else {
    wimbal(keyPressed);
  }
};

export default { playNote };
