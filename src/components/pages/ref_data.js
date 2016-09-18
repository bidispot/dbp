import React from 'react';
import MyPageHeader from '../common/page_header';
import Query from '../../containers/ref_data_query'
import List from '../../containers/ref_data_list'

const ReferenceData = () => {
    return (
      <div className="page-wrapper content">
        <MyPageHeader title="Reference Data" icon="line-chart"/>
        <Query />
        <List />
      </div>
    );
};

export default ReferenceData;
