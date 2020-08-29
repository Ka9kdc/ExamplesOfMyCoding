import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './components/main';
import { Provider } from 'react-redux';
import store from './store'

ReactDOM.render(
 
  <Router>
    <Main />
  </Router>
  ,
  document.getElementById('app')
);