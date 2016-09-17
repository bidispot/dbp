import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import api from './middleware/api.js';
import routes from './routes';
import dbpApp from './reducers';
import './style/react-bootstrap-table-all.min.css'; // version 2.5.2
import './style/font-awesome.min.css'
import './style/style.css';

let store = createStore(dbpApp, applyMiddleware(thunk, api));

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.getElementById('root')
);
