import React from 'react';
import { IndexRedirect, Route /*, RouterContext */ } from 'react-router';
//import { UserAuthWrapper } from 'redux-auth-wrapper';
import AppMainLayout from './components/AppMainLayout';
import welcome from "./modules/welcome";
import dashboard from "./modules/dashboard";
import balances from "./modules/balances";
import accounts from "./modules/accounts";

// Redirects to / by default
// const UserIsAuthenticated = UserAuthWrapper({
//   authSelector: state => state.welcome, // how to get the user state
//   redirectAction: RouterContext.replace, // the redux action to dispatch for redirect
//   wrapperDisplayName: 'UserIsAuthenticated', // a nice name for this auth check
//   predicate: welcome => welcome.is_authorized, // check if 'is_authorized' exists
//   allowRedirectBack: false,
//   failureRedirectPath: '/auth'
// });

const getRoutes = (store) => {
  const requireAuth = (nextState, replace) => {
    const state = store.getState();
    console.log("Require Auth? ", !state.welcome.is_authorized);
    if (!state.welcome.is_authorized) {
      replace({
        pathname: '/auth',
        state: { nextPathname: nextState.location.pathname }
      });
    }
  };

  return (
    <Route path="/">
      <IndexRedirect to="dashboard" />
      <Route path="auth" component={welcome.components.WelcomePage} />
      <Route path="/" component={AppMainLayout}>
        <Route path="dashboard" component={dashboard.components.DashboardPage} onEnter={requireAuth} />
        <Route path="balances" component={balances.components.BalancesPage} onEnter={requireAuth} />
        <Route path="accounts" component={accounts.components.AccountsPage} onEnter={requireAuth} />
      </Route>
    </Route>
  );
};

export default { getRoutes };
