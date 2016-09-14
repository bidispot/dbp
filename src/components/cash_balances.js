import React from 'react';
import NavBar from '../containers/nav_bar';
import MyPageHeader from './page_header';
import Query from '../containers/balances_query'
import List from '../containers/balances_list'

const Balances = () => {
    return (
      <div>
        <NavBar />
        <div className="page-wrapper content">
          <MyPageHeader title="Cash balances" />
          <Query />
          <List />
        </div>
      </div>
    );
};

export default Balances;
