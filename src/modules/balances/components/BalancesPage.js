// @flow
import React from 'react';
import PageHeader from '../../../components/library/PageHeader';
import Query from './BalancesQueryView';
import List from './BalancesListView';

const BalancesPage = () => {
    return (
      <div className="page-wrapper content">
        <PageHeader title="Cash balances" headerIcon="usd" />
        <Query />
        <List />
      </div>
    );
};

export default BalancesPage;
