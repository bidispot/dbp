import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { getCashBalancesQueryResults } from '../selectors';

class AccountsList extends Component {
  asJson() {
    return [...this.props.results].map((balance) => {
      return balance.toJS();
    });
  };

  render() {
    if (!this.props.results || this.props.results.size === 0) {
      return (
        <Panel collapsible defaultExpanded header="List" bsStyle="info">
          <div>No rows available</div>
        </Panel>
      );
    }

    return (
      <Panel collapsible defaultExpanded header="List" bsStyle="info">
        <BootstrapTable
          data={this.asJson()}
          striped={true}
          hover={true}
          condensed={true}
          search={true}>
          <TableHeaderColumn dataField="id" isKey={true} hidden={true} dataAlign="right" dataSort={true}>Id</TableHeaderColumn>
          <TableHeaderColumn dataField="account" dataAlign="right" dataSort={true}>Account</TableHeaderColumn>
          <TableHeaderColumn dataField="accountName" dataAlign="right" dataSort={true}>Account Name</TableHeaderColumn>
          <TableHeaderColumn dataField="amount" dataAlign="right" dataSort={true}>Amount</TableHeaderColumn>
        </BootstrapTable>

      </Panel>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    results: getCashBalancesQueryResults(state)
  }
}

export default connect(mapStateToProps)(AccountsList);
