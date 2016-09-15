import React from 'react';
import MyPageHeader from '../common/page_header';
import StatWidget from "../common/stat_widget";

const DashBoard = () => {
  return (
        <div className="page-wrapper content">
          <MyPageHeader title="Dashboard" />
          <div className="row">
            <div className="col-lg-4 col-md-8">
              <StatWidget style="info"
                icon="envelope"
                count="26"
                headerText="Unread messages"
                footerText="View Details"
                linkTo="/" />
            </div>
            <div className="col-lg-4 col-md-8">
              <StatWidget style="danger"
                icon="tasks"
                count="3"
                headerText="Pending tasks"
                footerText="View Details"
                linkTo="/" />
            </div>
          </div>
          <MyPageHeader title="Current data" />
          <div className="row">
            <div className="col-lg-4 col-md-8">
              <StatWidget style="danger"
                icon="usd"
                count="8"
                headerText="Negative balances"
                footerText="View Details"
                linkTo="/" />
            </div>
            <div className="col-lg-4 col-md-8">
              <StatWidget style="success"
                icon="user"
                count="34"
                headerText="Accounts"
                footerText="View Details"
                linkTo="/" />
            </div>
            <div className="col-lg-4 col-md-8">
              <StatWidget style="warning"
                icon="eur"
                count="124"
                headerText="Unmatched instructions (EUR)"
                footerText="View Details"
                linkTo="/" />
            </div>
          </div>
      </div>
  );
};

export default DashBoard;

