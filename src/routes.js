import React from 'react';
import { Router, Route } from 'react-router';

import App from './components/app';
import Accounts from './components/accounts';
import Balances from './components/cash_balances';
import Indicators from './components/indicators';
import ReferenceData from './components/ref_data';

export default (
  <Router>
    <Route path="/" component={App} />
    <Route path="/accounts" component={Accounts} />
    <Route path="/balances" component={Balances} />
    <Route path="/indicators" component={Indicators} />
    <Route path="/ref_data" component={ReferenceData} />
  </Router>
);
