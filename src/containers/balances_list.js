import React, { Component } from 'react';
import { Panel, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getCashBalancesQueryResults } from '../selectors';

class BalancesList extends Component {

  renderBalances() {
    return this.props.results.map((balance) => {
      return (
        <tr key={balance.id}>
          <td>{balance.account}</td>
          <td>{balance.accountName}</td>
          <td>{balance.currency}</td>
          <td>{balance.amount}</td>
          <td>{balance.date}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <Panel collapsible defaultExpanded header="List" bsStyle="success">
        <Table responsive striped hover style={{ margin: 20 }}>
          <thead>
            <tr>
              <th>Account</th>
              <th>Account Name</th>
              <th>Currency</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {this.renderBalances()}
          </tbody>
        </Table>
      </Panel>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    results: getCashBalancesQueryResults(state)
  }
}

export default connect(mapStateToProps)(BalancesList);
