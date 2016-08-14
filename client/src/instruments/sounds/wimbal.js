import { MonoSynth } from 'tone';

const config = {
  oscillator: {
    type: 'triangle',
  },
  envelope: {
    attack: 0.1,
    decay: 2,
    sustain: 0,
    release: 3
  },
  filterEnvelope: {
    attack: 0,
    decay: 2,
    sustain: 2,
    release: 1,
    baseFrequency: 330,
    octaves: 5,
    exponent: 2
  }
};

const keyToNote = {
  q: 'F4',
  w: 'G4',
  e: 'A4',
  r: 'B4',
  t: 'C5',
  y: 'D5',
  u: 'E5',
  i: 'F5',
  o: 'G5',
  p: 'A5'
};

const synth = new MonoSynth(config).toMaster();

export default keyPressed => synth.triggerAttackRelease(keyToNote[keyPressed], '8n');
