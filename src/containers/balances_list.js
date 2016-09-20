import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import {  BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { connect } from 'react-redux';
import moment from 'moment';
import numeral from 'numeral';
import ReactHighcharts from 'react-highcharts';
import { getFavoriteAccount, getCashBalancesQueryResults } from '../selectors';
import { selectFavoriteAccount } from '../actions';

//Row select setting
let selectRowProp = {
  mode: "radio",
  clickToSelect: true,
  className: "selected-cell",
  onSelect: null
};

class BalancesList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedAccount: null
    };

    this.onSelectRow = this.onSelectRow.bind(this);
    this.renderLineChart = this.renderLineChart.bind(this);
    selectRowProp.onSelect = this.onSelectRow;
  }

  dataForSelectedAccount(account) {
    const selectedAccount = account;
    return [...this.props.results].map((balance) => {
      return balance.toJS();
    }).filter((balance) => balance.account === selectedAccount);
  }

  onSelectRow(row, selected) {
    this.setState({ selectedAccount: row});
  }

  renderLineChart() {
    if (!this.state.selectedAccount) {
      return (
        <Panel collapsible defaultExpanded header="List">
          <div>Please select a row to display the cash balances history.</div>
        </Panel>
      );
    }

    const dataArr = this.dataForSelectedAccount(this.state.selectedAccount.account)

    const dates = dataArr.map((balance) => {
      return this.dateFormatter(balance.date);
    });

    const amounts = dataArr.map((balance) => {
      return balance.amount;
    });

    const formattedAmounts = dataArr.map((balance) => {
      return this.amountFormatter(balance.amount, balance.currency);
    });

    const config = {
      title: {
        text: `Cash balances for ${this.state.selectedAccount.accountName} (${this.state.selectedAccount.account})`
      },
      xAxis: {
        categories: dates.reverse()
      },
      labels: {
        items: formattedAmounts.reverse()
      },
      series: [{
        name: `Cash balances for ${this.state.selectedAccount.accountName} (${this.state.selectedAccount.account})`,
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

  asJson() {
    return [...this.props.results].map((balance) => {
      return balance.toJS();
    });
  };

  amountFormatter(cell, row) {
    const format = '0,0[.]00';
    const currencies = {
      'EUR': '€',
      'USD': '$',
      'GBP': '£',
      'JPY': '¥'
    }

    let symbol = currencies[row.currency];
    if (symbol === undefined) {
      symbol = row.currency;
    }

    return `${numeral(row.amount).format(format)} ${symbol}`;
  }

  dateFormatter(cell, row) {
    return moment.unix(cell / 1000).format('DD/MM/YYYY');
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
            data={this.asJson() }
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


const mapStateToProps = (state) => {
  return {
    results: getCashBalancesQueryResults(state),
    favoriteAccount: getFavoriteAccount(state)
  }
}

export default connect(mapStateToProps, { selectFavoriteAccount })(BalancesList);
