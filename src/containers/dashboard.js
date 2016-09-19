import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, ControlLabel, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import MyPageHeader from '../components/common/page_header';
import StatWidget from "../components/common/stat_widget";
import Clock from 'react-clock';
import moment from 'moment';
import numeral from 'numeral';
import ReactHighcharts from 'react-highcharts';
import HighchartsMore from 'highcharts-more';
import HighchartsExporting from 'highcharts-exporting';
import { queryChartBalances } from '../actions';
import { getFavoriteAccount, getChartBalancesQueryResults, getChartBalancesQueryParameters } from '../selectors';

HighchartsMore(ReactHighcharts.Highcharts);
HighchartsExporting(ReactHighcharts.Highcharts);

class DashBoard extends Component {
  constructor(props) {
    super(props);

    this.onQuerySubmit();

    this.onQuerySubmit = this.onQuerySubmit.bind(this);
    this.renderLineChart = this.renderLineChart.bind(this);
  }

  onQuerySubmit(e) {
    if (this.props.favoriteAccount) {
      this.props.queryBalances({ account: this.props.favoriteAccount.account });
      if (e) {
        e.preventDefault();
      }
    }
  }

  amountFormatter(amount, currency) {
    const format = '0,0[.]00';
    const currencies = {
      'EUR': '€',
      'USD': '$',
      'GBP': '£',
      'JPY': '¥'
    }

    let symbol = currencies[currency];
    if (symbol === undefined) {
      symbol = currency;
    }

    return `${numeral(amount).format(format)} ${symbol}`;
  }

  dateFormatter(date) {
    return moment.unix(date / 1000).format('DD/MM/YYYY');
  }

  renderLineChart() {
    if (!this.props.favoriteAccount) {
      return (
        <div className="col-lg-9 col-md-10"><br /><Link to="/balances">Please select your favorite account.</Link></div>
      );
    }
    if (!this.props.results || this.props.results.size === 0) {
      return (
        <div className="col-lg-9 col-md-10">Loading...</div>
      );
    }

    const dates = [...this.props.results].map((balance) => {
      return this.dateFormatter(balance.date);
    });

    const amounts = [...this.props.results].map((balance) => {
      return balance.amount;
    });

    const formattedAmounts = [...this.props.results].map((balance) => {
      return this.amountFormatter(balance.amount, balance.currency);
    });

    const config = {
      title: {
        text: `Cash balances for ${this.props.favoriteAccount.accountName} (${this.props.queryParameters.account})`
      },
      xAxis: {
        categories: dates.reverse()
      },
      labels: {
        items: formattedAmounts.reverse()
      },
      series: [{
        name: `Cash balances for ${this.props.favoriteAccount.accountName} (${this.props.queryParameters.account})`,
        data: amounts.reverse(),
        tooltip: {
          valueDecimals: 2
        }
      }]
    };

    return (
      <div>
        <div className="col-lg-10 col-md-10">
          <br />
          <Form horizontal onSubmit={this.onQuerySubmit}>
            <ControlLabel>Cash balances for {this.props.favoriteAccount.accountName} </ControlLabel>
            <Button className="refresh-button" type="submit">
              Refresh
            </Button>
          </Form>
          <br />
        </div>
        <div className="col-lg-10 col-md-10">
          <ReactHighcharts config={config} />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="page-wrapper content">
        <MyPageHeader title="Dashboard" icon="home" />
        <div className="row">
          <div className="col-lg-2 col-md-6">
            <div className="panel panel-blue panel-alt widget-today">
              <div className="panel-heading text-center">
                <FontAwesome name="calendar" />
              </div>
              <div className="panel-body text-center">
                <h3 className="today">23 Sep 16</h3>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-6">
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
              count="1"
              headerText="Negative balance"
              footerText="View Details"
              linkTo="/balances"
              css="negative" />
          </div>
          <div className="col-lg-3 col-md-6">
            <StatWidget style="success"
              icon="user"
              count="7"
              headerText="Accounts"
              footerText="View Details"
              linkTo="/accounts"
              css="positive" />
          </div>
          <div className="col-lg-4 col-md-6">
            <StatWidget style="warning"
              icon="eur"
              count="8"
              headerText="Unmatched instructions (EUR)"
              footerText="View Details"
              linkTo="/ref_data"
              css="ref_data_primary_color" />
          </div>
        </div>
        <MyPageHeader title="My monitor" icon="area-chart" display={false} />
        { this.renderLineChart() }
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    results: getChartBalancesQueryResults(state),
    queryParameters: getChartBalancesQueryParameters(state),
    favoriteAccount: getFavoriteAccount(state)
  }
}

export default connect(mapStateToProps, { queryBalances: queryChartBalances })(DashBoard);
