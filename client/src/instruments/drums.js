import { Sampler } from 'tone';

const bd1 = new Sampler('/assets/audio/BD5050.mp3', () => { bd1.volume.value = -8; }).toMaster();
const bd2 = new Sampler('/assets/audio/BD2550.mp3', () => { bd2.volume.value = -8; }).toMaster();

const cb = new Sampler('/assets/audio/CB.mp3', () => {}).toMaster();
const ch = new Sampler('/assets/audio/CH.mp3', () => {}).toMaster();
const cl = new Sampler('/assets/audio/CL.mp3', () => {}).toMaster();
const cp = new Sampler('/assets/audio/CP.mp3', () => {}).toMaster();

const cy1 = new Sampler('/assets/audio/CY1050.mp3', () => {}).toMaster();
const cy2 = new Sampler('/assets/audio/CY7500.mp3', () => {}).toMaster();

const lt = new Sampler('/assets/audio/LT25.mp3', () => {}).toMaster();
const lc = new Sampler('/assets/audio/LC50.mp3', () => {}).toMaster();
const mt = new Sampler('/assets/audio/MT75.mp3', () => {}).toMaster();
const mc = new Sampler('/assets/audio/MC10.mp3', () => {}).toMaster();
const ht = new Sampler('/assets/audio/HT75.mp3', () => {}).toMaster();
const hc = new Sampler('/assets/audio/HC10.mp3', () => {}).toMaster();

const sd1 = new Sampler('/assets/audio/SD7550.mp3', () => {}).toMaster();
const sd2 = new Sampler('/assets/audio/SD5050.mp3', () => {}).toMaster();
const sd3 = new Sampler('/assets/audio/SD2500.mp3', () => { sd3.volume.value = -8; }).toMaster();

const ma = new Sampler('/assets/audio/MA.mp3', () => {}).toMaster();
const rs = new Sampler('/assets/audio/RS.mp3', () => {}).toMaster();
const oh = new Sampler('/assets/audio/OH50.mp3', () => {}).toMaster();

const keyToNote = {
  a: bd1,
  s: bd2,
  d: lt,
  f: mt,
  g: ht,
  j: sd1,
  k: sd2,
  l: sd3,
  w: lc,
  e: mc,
  r: hc,
  i: cy1,
  o: cy2,
  x: cb,
  c: ch,
  v: cl,
  b: cp,
  t: ma,
  y: rs,
  u: oh
};

function playNote(keyPressed) {
  keyPressed += '';
  const sound = keyToNote[keyPressed];
  if (sound) {
    sound.triggerAttack();
  }
}

export default { playNote };
