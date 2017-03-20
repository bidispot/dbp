// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as I from 'immutable';
import { Form, ControlLabel, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import { FormattedMessage, FormattedDate, injectIntl } from 'react-intl';
import Clock from 'react-clock';
import moment from 'moment';
import numeral from 'numeral';
import ReactHighcharts from 'react-highcharts';
import HighchartsMore from 'highcharts-more';
import HighchartsExporting from 'highcharts-exporting';
import FontAwesome from 'react-fontawesome';
import PageHeader from '../../../components/library/PageHeader';
import balancesModule from '../../balances';
import accountsModule from '../../accounts';
import msg, { Keys } from './DashboardPage_messages';
import appMsg, { Keys as AppKeys } from '../../../i18n/keys';
import type { PropsWithIntl } from '../../../types';

HighchartsMore(ReactHighcharts.Highcharts);
HighchartsExporting(ReactHighcharts.Highcharts);

type OwnProps = {|
  results: I.List<balancesModule.model.ImmutableBalance>,
  chartQueryParameters: balancesModule.model.ImmutableQueryParameters,
  favouriteAccount: ?accountsModule.model.ImmutableAccount,
|};

type Props = PropsWithIntl<OwnProps> & {
  queryCharts: typeof balancesModule.actions.queryCharts,
};

class DashboardPage extends Component {
  props: Props;

  constructor(props) {
    super(props);

    this.onQuerySubmit();

    (this: any).onQuerySubmit = this.onQuerySubmit.bind(this);
    (this: any).renderLineChart = this.renderLineChart.bind(this);
  }

  onQuerySubmit(e: ?Object) {
    const favAcct = this.props.favouriteAccount;
    if (favAcct != null) {
      this.props.queryCharts(({ account: favAcct.getAccount() }));
      if (e) {
        e.preventDefault();
      }
    }
  }

  amountFormatter(amount: number, currency: string) {
    const format = '0,0[.]00';
    const currencies = {
      'EUR': '€',
      'USD': '$',
      'GBP': '£',
      'JPY': '¥'
    };

    let symbol = currencies[currency];
    if (symbol === undefined) {
      symbol = currency;
    }

    return `${numeral(amount).format(format)} ${symbol}`;
  }

  dateFormatter(date: number) {
    return moment.unix(date / 1000).format('DD/MM/YYYY');
  }

  renderLineChart() {
    const favAcct = this.props.favouriteAccount;
    const results = this.props.results;
    const queryParamAccount = this.props.chartQueryParameters.getAccount() || '';

    if (favAcct == null) {
      return (
        <div className="col-lg-9 col-md-10"><br /><Link to="/accounts"><FormattedMessage id={Keys.WIDGETS_MONITOR_MESSAGES_FAVOURITEACCOUNTNOTSELECTED} /></Link></div>
      );
    }

    if (!results || results.size === 0) {
      return (
        <div className="col-lg-9 col-md-10">Loading...</div>
      );
    }

    const dates = results.map((balance) => {
      return this.dateFormatter(balance.getDate());
    }).toJS();

    const amounts = results.map((balance) => {
      return balance.getAmount();
    }).toJS();

    const formattedAmounts = results.map((balance) => {
      return this.amountFormatter(balance.getAmount(), balance.getCurrency());
    }).toJS();

    const config = {
      title: {
        text: this.props.intl.formatMessage(msg(Keys.WIDGETS_MONITOR_MESSAGES_BALANCESFORACCOUNT), {name: favAcct.getName(), account: queryParamAccount})
      },
      xAxis: {
        categories: dates.reverse()
      },
      labels: {
        items: formattedAmounts.reverse()
      },
      series: [{
        name: this.props.intl.formatMessage(msg(Keys.WIDGETS_MONITOR_MESSAGES_BALANCESFORACCOUNT), {name: favAcct.getName(), account: queryParamAccount}),
        data: amounts.reverse(),
        tooltip: {
          valueDecimals: 2
        }
      }]
    };

    return (
      <div>
        <div className="col-lg-9 col-md-10">
          <br />
          <Form horizontal onSubmit={this.onQuerySubmit}>
            <ControlLabel><FormattedMessage id={Keys.WIDGETS_MONITOR_MESSAGES_BALANCESFORACCOUNTNAME} values={ {name: favAcct.getName()} } /></ControlLabel>
            <Button className="refresh-button" type="submit">
              <FontAwesome name='refresh'/> <FormattedMessage id={Keys.WIDGETS_MONITOR_BUTTONS_REFRESH_TITLE} />
            </Button>
            <Link className="switch-account--button pull-right" to="/accounts">
              <FormattedMessage id={Keys.WIDGETS_MONITOR_BUTTONS_SWITCHACCOUNT_TITLE} />
            </Link>
          </Form>
          <br />
        </div>
        <div className="col-lg-9 col-md-10">
          <ReactHighcharts config={config} />
        </div>
      </div>
    );
  }

  render() {
    let deadline = new Date();
    deadline.setHours(16);
    deadline.setMinutes(0);

    return (
      <div className="page-wrapper content">
        <PageHeader title={this.props.intl.formatMessage(msg(Keys.SECTIONS_DASHBOARD_TITLE))} headerIcon="home" rootText={this.props.intl.formatMessage(appMsg(AppKeys.APP_TITLE))} />
        <div className="row">
          <div className="col-lg-2 col-md-6">
            <div className="panel panel-info panel-alt widget-today">
              <div className="panel-heading text-center">
                <FontAwesome name="calendar" />
                {/*<div className="calendar-div"><span className="calendar-text">3 events</span></div>*/}
              </div>
              <div className="panel-body text-center">
                <h3 className="today">
                  <FormattedDate value={Date.now()} day='2-digit' month='short' year='numeric' />
                </h3>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-6">
            <div className="panel panel-info panel-alt widget-time">
              <div className="panel-heading text-center">
                <FontAwesome name="clock-o" />
              </div>
              <div className="panel-body text-center">
                <h3 className="today"><Clock /></h3>
              </div>
            </div>
          </div>
        </div>

        <PageHeader title={this.props.intl.formatMessage(msg(Keys.SECTIONS_MONITOR_TITLE))} headerIcon="area-chart" display={false} />
        { this.renderLineChart() }
      </div>
    );
  }
};

const mapStateToProps = (state): OwnProps => {
  return {
    results: balancesModule.selectors.getChartResults(state),
    chartQueryParameters: balancesModule.selectors.getChartQueryParameters(state),
    favouriteAccount: accountsModule.selectors.getFavouriteAccount(state)
  }
};

export default connect(mapStateToProps, { queryCharts: balancesModule.actions.queryCharts })(injectIntl(DashboardPage));
