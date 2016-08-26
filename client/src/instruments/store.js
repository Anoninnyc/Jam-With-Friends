import laserbells from './laserbells';
import piano from './piano';
import drums from './drums';

const store = {
  laserbells: laserbells.playNote,
  piano: piano.playNote,
  drums: drums.playNote
};

const instruments = ['piano', 'drums', 'laserbells'];

export { store, instruments };
