import { MembraneSynth } from 'tone';

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

const keyToNote = {
  a: 'D1',
  s: 'E1',
  d: 'C1',
  f: 'C2',
  g: 'D2',
  e: 'F3',
  h: 'G3',
};

const basso = new MembraneSynth(lowConfig).toMaster();

export default keyPressed => basso.triggerAttackRelease(keyToNote[keyPressed], '8n');
