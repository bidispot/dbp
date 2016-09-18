import React from 'react';
import FontAwesome from 'react-fontawesome';
import MyPageHeader from '../common/page_header';
import StatWidget from "../common/stat_widget";
import Clock from 'react-clock';

const DashBoard = () => {
  return (
        <div className="page-wrapper content">
          <MyPageHeader title="Dashboard" icon="home" />
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="panel panel-blue panel-alt widget-today">
                <div className="panel-heading text-center">
                  <FontAwesome name="calendar" />
                </div>
                <div className="panel-body text-center">
                  <h3 className="today">23 Sep 2016</h3>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="panel panel-blue panel-alt widget-time">
                <div className="panel-heading text-center">
                  <FontAwesome name="clock-o" />
                </div>
                <div className="panel-body text-center">
                  <h3 className="today"><Clock /></h3>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <StatWidget style="danger"
                icon="tasks"
                count="3"
                headerText="Pending tasks"
                footerText="View Details"
                linkTo="/"
                css="negative"/>
            </div>
            <div className="col-lg-3 col-md-6">
              <StatWidget style="info"
                icon="envelope"
                count="26"
                headerText="Unread messages"
                footerText="View Details"
                linkTo="/"
                css="default-dark"/>
            </div>
          </div>
          <MyPageHeader title="Indicators" icon="calendar" display={false} />
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <StatWidget style="danger"
                icon="usd"
                count="8"
                headerText="Negative balances"
                footerText="View Details"
                linkTo="/"
                css="negative" />
            </div>
            <div className="col-lg-3 col-md-6">
              <StatWidget style="success"
                icon="user"
                count="34"
                headerText="Accounts"
                footerText="View Details"
                linkTo="/"
                css="positive" />
            </div>
            <div className="col-lg-3 col-md-6">
              <StatWidget style="warning"
                icon="eur"
                count="124"
                headerText="Unmatched instructions (EUR)"
                footerText="View Details"
                linkTo="/"
                css="ref_data_primary_color" />
            </div>
          </div>
          <MyPageHeader title="My monitors" icon="area-chart" display={false} />
      </div>
  );
};

export default DashBoard;

