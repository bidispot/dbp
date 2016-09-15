import React from 'react';
import NavBar from './nav_bar';
import MyPageHeader from './page_header';

const Indicators = () => {
    return (
      <div>
        <NavBar />
        <div className="page-wrapper content">
          <MyPageHeader title="Indicators" />
        </div>
      </div>
    );
};

export default Indicators;
