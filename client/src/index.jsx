import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './containers/App';
import LandingPage from './components/LandingPage';
import Login from './containers/Login';
import Signup from './containers/Signup';
import SelectInstrument from './containers/SelectInstrument';
import SelectRoom from './containers/SelectRoom';
import JamRoom from './containers/JamRoom';
import Room from 'Room';
import TestPicker from 'TestPicker';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={LandingPage} />
      <Route path="login" component={Login} />
      <Route path="signup" component={Signup} />
      <Route path="selectInstrument" component={SelectInstrument} />
      <Route path="selectRoom" component={SelectRoom} />
      <Route path="jam" component={JamRoom} />
      { /* for testing sounds */ }
      <Route path="room" component={Room} />
      { /* for testing unique links */}
      <Route path="testpicker" component={TestPicker} />
    </Route>
  </Router>
), document.getElementById('app'));
