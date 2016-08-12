import injectTapEventPlugin from 'react-tap-event-plugin';
import React, { Component } from 'react';
import { render } from 'react-dom';
import App from './containers/App.jsx';
injectTapEventPlugin();

render(
  <App />,
  document.getElementById('app')
);