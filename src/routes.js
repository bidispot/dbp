import React from 'react';
import { IndexRoute, IndexRedirect, Route } from 'react-router';

import NavLayout from "./components/layouts/navigation_bar";
import HomePage from "./containers/dashboard";
import Balances from "./components/pages/cash_balances";
import Accounts from "./components/pages/accounts";
import Indicators from "./components/pages/indicators";
import ReferenceData from "./components/pages/ref_data";

export default (
    <Route path="/" component={NavLayout}>
      <IndexRoute component={NavLayout} />
      <IndexRedirect to="/dashboard" />
      <Route name="dashboard" path="/dashboard" component={HomePage} />
      <Route path="/balances" component={Balances} />
      <Route path="/indicators" component={Indicators} />
      <Route path="/accounts" component={Accounts} />
      <Route path="/ref_data" component={ReferenceData} />
    </Route>
);
