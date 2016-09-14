import React from 'react';
import MyPageHeader from './page_header';
import StatWidget from "./stat_widget";

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
                count="12"
                headerText="New Tasks"
                footerText="View Details"
                linkTo="/" />
            </div>
          </div>
          <MyPageHeader title="My data" />
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
                headerText="Positive balances"
                footerText="View Details"
                linkTo="/" />
            </div>
            <div className="col-lg-4 col-md-8">
              <StatWidget style="success"
                icon="eur"
                count="124"
                headerText="Unmatched inx in EUR"
                footerText="View Details"
                linkTo="/" />
            </div>
          </div>
      </div>
  );
};

export default DashBoard;
