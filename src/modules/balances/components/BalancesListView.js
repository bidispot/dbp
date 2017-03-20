// @flow
import React, { Component } from 'react';
import * as I from 'immutable';
import { Panel } from 'react-bootstrap';
import {  BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { connect } from 'react-redux';
import moment from 'moment';
import numeral from 'numeral';
import ReactHighcharts from 'react-highcharts';
import { getQueryResults } from '../selectors';
import type { Balance, ImmutableBalance  } from '../model';
import type { PropsWithDispatch } from '../../../types';

type OwnProps = {|
  results: I.List<ImmutableBalance>
|};

type Props = PropsWithDispatch<OwnProps> // adds dispatch function

type State = {|
  selectedBalance: ?Balance
|};

// Row selection settings
let selectRowProp: {
  mode: string,
  clickToSelect: true,
  className: string,
  onSelect: ?((row: Balance, isSelected: boolean, event: Object) => void)
} = {
  mode: "radio",
  clickToSelect: true,
  className: "selected-cell",
  onSelect: null
};

export class BalancesListView extends Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      selectedBalance: null
    };

    (this: any).onSelectRow = this.onSelectRow.bind(this);
    (this: any).renderLineChart = this.renderLineChart.bind(this);
    selectRowProp.onSelect = this.onSelectRow;
  }

  dataForSelectedAccount(account: string) {
    const selectedAccount = account;
    return this.props.results.toJS().map((balance) => {
      return balance;
    }).filter((balance) => balance.account === selectedAccount);
  }

  onSelectRow(row: Balance, isSelected: boolean, event: Object) {
    this.setState({ selectedBalance: row});
  }

  renderLineChart() {
    if (!this.state.selectedBalance) {
      return (
        <Panel collapsible defaultExpanded header="List">
          <div>Please select a row to display the cash balances history.</div>
        </Panel>
      );
    } else {
      const selectedBalance = this.state.selectedBalance;

      const dataArr = this.dataForSelectedAccount(selectedBalance.account);

      const dates = dataArr.map((balance) => {
        return this.dateFormatter(balance.date, balance);
      });

      const amounts = dataArr.map((balance) => {
        return balance.amount;
      });

      const formattedAmounts = dataArr.map((balance) => {
        return this.amountFormatter(balance.amount, balance);
      });

      const config = {
        title: {
          text: `Cash balances for ${selectedBalance.accountName} (${selectedBalance.account})`
        },
        xAxis: {
          categories: dates.reverse()
        },
        labels: {
          items: formattedAmounts.reverse()
        },
        series: [{
          name: `Cash balances for ${selectedBalance.accountName} (${selectedBalance.account})`,
          data: amounts.reverse(),
          tooltip: {
            valueDecimals: 2
          }
        }]
      };

      return (
        <Panel collapsible defaultExpanded header="History">
          <div className="col-lg-10 col-md-10">
            <ReactHighcharts config={config} />
          </div>
        </Panel>
      );
    }
  }

  resultsAsJson() {
    return this.props.results.toJS();
  };

  amountFormatter(amount: number, balance: Balance) {
    const format = '0,0[.]00';
    const currencies = {
      'EUR': '€',
      'USD': '$',
      'GBP': '£',
      'JPY': '¥'
    }

    let symbol = currencies[balance.currency];
    if (symbol === undefined) {
      symbol = balance.currency;
    }

    return `${numeral(balance.amount).format(format)} ${symbol}`;
  }

  dateFormatter(date: number, balance: Balance) {
    return moment.unix(date / 1000).format('DD/MM/YYYY');
  }

  render() {
    if (!this.props.results || this.props.results.size === 0) {
      return (
        <Panel collapsible defaultExpanded header="List">
          <div>No rows available</div>
        </Panel>
      );
    }

    const options = {sizePerPageList: [5, 10], sizePerPage: 5};

    return (
      <div>
        <Panel collapsible defaultExpanded header="List">
          <BootstrapTable
            data={this.resultsAsJson() }
            striped={true}
            hover={true}
            condensed={true}
            pagination={true}
            search={true}
            exportCSV={true}
            selectRow={selectRowProp}
            options={options}>
            <TableHeaderColumn dataField="id" isKey={true} hidden={true} dataAlign="right" dataSort={true}>Id</TableHeaderColumn>
            <TableHeaderColumn dataField="account" dataAlign="right" dataSort={true}>Account</TableHeaderColumn>
            <TableHeaderColumn dataField="accountName" dataAlign="right" dataSort={true}>Account Name</TableHeaderColumn>
            <TableHeaderColumn dataField="amount" dataAlign="right" dataSort={true} dataFormat={this.amountFormatter}>Amount</TableHeaderColumn>
            <TableHeaderColumn dataField="currency" dataAlign="right" hidden={true}>Currency</TableHeaderColumn>
            <TableHeaderColumn dataField="date" dataAlign="right" dataSort={true} dataFormat={this.dateFormatter}>Date</TableHeaderColumn>
          </BootstrapTable>
        </Panel>
        { this.renderLineChart() }
      </div>
    );
  };
}


const mapStateToProps = (state): OwnProps => {
  return {
    results: getQueryResults(state)
  }
}

export default connect(mapStateToProps)(BalancesListView);
