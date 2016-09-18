import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Form, ControlLabel, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import MyPageHeader from '../components/common/page_header';
import StatWidget from "../components/common/stat_widget";
import Clock from 'react-clock';
import ReactHighcharts from 'react-highcharts';
import HighchartsMore from 'highcharts-more';
import HighchartsExporting from 'highcharts-exporting';
import { queryBalances } from '../actions';
import { getCashBalancesQueryResults, getCashBalancesQueryParameters, getIsCashBalancesQuerying } from '../selectors';

class DashBoard extends Component {
  constructor(props) {
    super(props);

    HighchartsMore(ReactHighcharts.Highcharts);
    HighchartsExporting(ReactHighcharts.Highcharts);

    this.onQuerySubmit();

    this.onQuerySubmit = this.onQuerySubmit.bind(this);
    this.renderLineChart = this.renderLineChart.bind(this);
  }

  onQuerySubmit(e) {
    this.props.queryBalances(this.buildQueryParametersFromLocalState());
    if (e) {
      e.preventDefault();
    }
  }

  buildQueryParametersFromLocalState() {
    return {
      account: null,
      dateFrom: null,
      dateTo: null
    }
  }

  renderLineChart() {
    if (!this.props.results || this.props.results.size === 0) {
      return (
        <div></div>
      );
    }

    const config = {
      title: {
        text: 'Cash balances'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      series: [{
        name: 'Cash balances for UBS-xxx',
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4],
        tooltip: {
          valueDecimals: 2
        }
      }]
    };

    return (
      <div className="col-lg-9 col-md-10">
        <ReactHighcharts config={config} />
      </div>
    );
  }

  render() {
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
            <MyPageHeader title="My monitor" icon="area-chart" display={false} />
            <div className="col-lg-9 col-md-10">
              <br />
              <Form horizontal onSubmit={this.onQuerySubmit}>
                <ControlLabel>Cash balances for client USB-xxx </ControlLabel>
                <Button className="refresh-button" type="submit">
                  Refresh
                </Button>
              </Form>
              <br />
            </div>
            { this.renderLineChart() }
        </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    queryParameters: getCashBalancesQueryParameters(state),
    isQuerying: getIsCashBalancesQuerying(state),
    results: getCashBalancesQueryResults(state)
  }
}

export default connect(mapStateToProps, { queryBalances })(DashBoard);
