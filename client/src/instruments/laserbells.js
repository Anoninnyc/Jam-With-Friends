import zwill from './sounds/zwill';

const playNote = keyPressed => {
  // coerce to string
  keyPressed += '';
  zwill(keyPressed);
};

export default { playNote };
