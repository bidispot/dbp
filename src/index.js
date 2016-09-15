import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import api from './middleware/api.js';
import routes from './routes';
import dbpApp from './reducers';
import { queryBalances } from './actions';
import { getCashBalancesQueryResults } from './selectors';

let store = createStore(dbpApp, applyMiddleware(thunk, api));

store.subscribe(() => {
    let state = store.getState();
    console.log(getCashBalancesQueryResults(state));
  }
)

store.dispatch(queryBalances({account: "UBS"}));
store.dispatch(queryBalances({}));

ReactDOM.render(
  <Router history={browserHistory} routes={routes} />
  , document.getElementById('root')
);
