import wimbal from 'wimbal';
import zwill from 'zwill';

const lowConfig = {
  pitchDecay: 0.05,
  octaves: 5,
  oscillator: {
    type: 'sine',
  },
  envelope: {
    attack: 0.001,
    decay: 0.1,
    sustain: 0.1,
    release: 3,
    attackCurve: 'exponential'
  }
};

const low = new Tone.MembraneSynth(lowConfig).toMaster();

const keyToNote = {
  a: 'D1',
  s: 'E1',
  d: 'C1',
  f: 'C2',
  g: 'D2',
  e: 'F3',
  h: 'G3',
};

const lowKeys = new Set('asdfgh');

// zimits
const midKeys = new Set('zxcvbnmjkl');

function playNote(keyPressed) {
  // coerce to string
  keyPressed += '';
  if (lowKeys.has(keyPressed)) {
    low.triggerAttackRelease(keyToNote[keyPressed], '8n');
  } else if (midKeys.has(keyPressed)) {
    zwill(keyPressed);
  } else {
    wimbal(keyPressed);
  }
}

export default playNote;
