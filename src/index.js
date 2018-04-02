import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'tether/dist/js/tether.min.js'
import 'bootstrap/dist/js/bootstrap.min';

const title = 'My Minimal React Webpack Babel Setup';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

module.hot.accept();
