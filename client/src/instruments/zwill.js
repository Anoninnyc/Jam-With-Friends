const keyToNote = {
  z: 'C6',
  x: 'D6',
  c: 'E6',
  v: 'F6',
  b: 'G6',
  n: 'A6',
  m: 'B6',
  j: 'C7',
  k: 'D7',
  l: 'E7'
};

const zimitsConfig = {
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

const zimit = new Tone.MembraneSynth(zimitsConfig).toMaster();

export default keyPressed => { zimit.triggerAttackRelease(keyToNote[keyPressed], '8n'); };
