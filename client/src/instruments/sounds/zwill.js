import { MembraneSynth } from 'tone';

const config = {
  pitchDecay: 0.1,
  octaves: 7,
  oscillator: {
    type: 'sine',
  },
  envelope: {
    attack: 0.001,
    decay: 0.1,
    sustain: 0.1,
    release: 2,
    attackCurve: 'linear'
  }
};

const keyToNote = {
  z: 'E4',
  x: 'F4',
  c: 'G4',
  v: 'A4',
  b: 'B4',
  n: 'C5',
  m: 'D5',
  a: 'E5',
  s: 'F5',
  d: 'G5',
  f: 'A5',
  g: 'B5',
  h: 'C6',
  j: 'D6',
  k: 'E6',
  l: 'F6',
  q: 'G6',
  w: 'A6',
  e: 'B6',
  r: 'C7',
  t: 'D7',
  y: 'E7',
  u: 'F7',
  i: 'G7',
  o: 'A7',
  p: 'B7'
};

const zimit = new MembraneSynth(config).toMaster();

export default keyPressed => zimit.triggerAttackRelease(keyToNote[keyPressed], '8n');
