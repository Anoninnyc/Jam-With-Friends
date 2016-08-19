import { MembraneSynth, MetalSynth } from 'tone';

const membrane = new MembraneSynth({
  envelope: {
    sustain: 0,
    attack: 0.02,
    decay: 0.8,
    attackCurve: 'bounce'
  },
  octaves: 1,
  oscillator: { type: 'sine' }
}).toMaster();

const metal = new MetalSynth({
  frequency: 60, // 200
  envelope: {
    attack: 0.0015,
    decay: 0.1, // 1.4
    release: 0.2 // 0.2
  },
  harmonicity: 5.1, // 5.1
  modulationIndex: 32, // 32
  resonance: 4000, // 4000
  octaves: 1.5
}).toMaster();

export { membrane, metal };
