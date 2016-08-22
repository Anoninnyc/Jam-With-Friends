import laserbells from './laserbells';
import piano from './piano';

const store = {
  laserbells: laserbells.playNote,
  piano: piano.playNote
};

const instruments = ['piano', 'drums', 'laserbells'];

export { store, instruments };
