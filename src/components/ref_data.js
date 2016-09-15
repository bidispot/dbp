import React from 'react';
import NavBar from './nav_bar';
import MyPageHeader from './page_header';
import Query from '../containers/ref_data_query'
import List from '../containers/ref_data_list'

const ReferenceData = () => {
    return (
      <div>
        <NavBar />
        <div className="page-wrapper content">
          <MyPageHeader title="Reference Data" />
          <Query />
          <List />
        </div>
      </div>
    );
};

export default ReferenceData;
