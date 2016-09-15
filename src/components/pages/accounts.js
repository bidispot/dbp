import React from 'react';
import MyPageHeader from '../common/page_header';
import Query from '../../containers/accounts_query'
import List from '../../containers/accounts_list'

const Accounts = () => {
  return (
    <div className="page-wrapper content">
      <MyPageHeader title="Accounts" />
      <Query />
      <List />
    </div>
  );
};

export default Accounts;
