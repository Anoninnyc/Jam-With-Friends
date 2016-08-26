import { Sampler } from 'tone';

const bd1 = new Sampler('/assets/audio/BD5050.mp3', () => { bd1.volume.value = -8; }).toMaster();
const bd2 = new Sampler('/assets/audio/BD2550.mp3', () => { bd2.volume.value = -8; }).toMaster();
const bd3 = new Sampler('/assets/audio/BD0050.mp3', () => { bd1.volume.value = -8; }).toMaster();
const bd4 = new Sampler('/assets/audio/BD7500.mp3', () => { bd2.volume.value = -8; }).toMaster();

const cb = new Sampler('/assets/audio/CB.mp3', () => {}).toMaster();
const ch = new Sampler('/assets/audio/CH.mp3', () => {}).toMaster();
const cl = new Sampler('/assets/audio/CL.mp3', () => {}).toMaster();
const cp = new Sampler('/assets/audio/CP.mp3', () => {}).toMaster();

const cy1 = new Sampler('/assets/audio/CY1050.mp3', () => {}).toMaster();
const cy2 = new Sampler('/assets/audio/CY7500.mp3', () => {}).toMaster();

const lt1 = new Sampler('/assets/audio/LT25.mp3', () => {}).toMaster();
const lc = new Sampler('/assets/audio/LC50.mp3', () => {}).toMaster();
const mt1 = new Sampler('/assets/audio/MT75.mp3', () => {}).toMaster();
const mc = new Sampler('/assets/audio/MC10.mp3', () => {}).toMaster();
const ht = new Sampler('/assets/audio/HT75.mp3', () => {}).toMaster();
const hc = new Sampler('/assets/audio/HC10.mp3', () => {}).toMaster();
const lt2 = new Sampler('/assets/audio/LT75.mp3', () => {}).toMaster();
const mt2 = new Sampler('/assets/audio/MT00.mp3', () => {}).toMaster();

const sd1 = new Sampler('/assets/audio/SD7550.mp3', () => {}).toMaster();
const sd2 = new Sampler('/assets/audio/SD5050.mp3', () => {}).toMaster();
const sd3 = new Sampler('/assets/audio/SD2500.mp3', () => { sd3.volume.value = -8; }).toMaster();
const sd4 = new Sampler('/assets/audio/SD1050.mp3', () => {}).toMaster();
const sd5 = new Sampler('/assets/audio/SD7500.mp3', () => { sd3.volume.value = -8; }).toMaster();
const sd6 = new Sampler('/assets/audio/SD0000.mp3', () => { sd3.volume.value = -8; }).toMaster();

const ma = new Sampler('/assets/audio/MA.mp3', () => {}).toMaster();
const rs = new Sampler('/assets/audio/RS.mp3', () => {}).toMaster();
const oh = new Sampler('/assets/audio/OH50.mp3', () => {}).toMaster();

const keyToNote = {
  a: bd1,
  s: bd2,
  d: bd3,
  f: bd4,
  g: lt1,
  h: mt1,
  j: ht,
  r: lt2,
  k: mt2,
  y: sd1,
  u: sd2,
  o: sd3,
  i: sd4,
  p: sd5,
  t: sd6,
  q: lc,
  w: mc,
  e: hc,
  ';': cy1,
  l: cy2,
  z: cb,
  x: ch,
  c: cl,
  v: cp,
  b: ma,
  n: rs,
  m: oh
};

function playNote(keyPressed) {
  keyPressed += '';
  const sound = keyToNote[keyPressed];
  if (sound) {
    sound.triggerAttack();
  }
}

export default { playNote };
