import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import api from './middleware/api.js';
import dbpApp from './reducers';
import { queryBalances } from './actions';
import App from './components/app';

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
  <App />,
  document.getElementById('root')
);
