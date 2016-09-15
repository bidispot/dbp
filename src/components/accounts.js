import React from 'react';
import NavBar from './nav_bar';
import MyPageHeader from './page_header';
import Query from '../containers/accounts_query'
import List from '../containers/accounts_list'

const Accounts = () => {
  return (
    <div>
      <NavBar />
      <div className="page-wrapper content">
        <MyPageHeader title="Accounts" />
        <Query />
        <List />
      </div>
    </div>
  );
};

export default Accounts;
