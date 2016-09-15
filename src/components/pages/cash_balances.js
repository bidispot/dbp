import React from 'react';
import MyPageHeader from '../common/page_header';
import Query from '../../containers/balances_query'
import List from '../../containers/balances_list'

const Balances = () => {
    return (
      <div className="page-wrapper content">
        <MyPageHeader title="Cash balances" />
        <Query />
        <List />
      </div>
    );
};

export default Balances;
