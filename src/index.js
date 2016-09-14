import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import api from './middleware/api.js';
import routes from './routes';
import dbpApp from './reducers';
import { queryBalances } from './actions';

let store = createStore(dbpApp, applyMiddleware(thunk, api));
console.log(store.getState());
store.subscribe(() => {
    let state = store.getState();
    console.log(state);
    const { balances } = state;
    if (balances) {
      console.log(balances.queryParameters);
    }
  }
)

store.dispatch(queryBalances({}));
store.dispatch(queryBalances({account: "UBS"}));

ReactDOM.render(
  <Router history={browserHistory} routes={routes} />
  , document.getElementById('root')
);
