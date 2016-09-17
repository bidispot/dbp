import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { getAccountsQueryResults } from '../selectors';

class AccountsList extends Component {
  asJson() {
    return [...this.props.results].map((account) => {
      return account.toJS();
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
          <TableHeaderColumn dataField="name" dataAlign="right" dataSort={true}>Name</TableHeaderColumn>
          <TableHeaderColumn dataField="currency" dataAlign="right" dataSort={true}>Currency</TableHeaderColumn>
          <TableHeaderColumn dataField="address" dataAlign="right" dataSort={true}>Address</TableHeaderColumn>
          <TableHeaderColumn dataField="country" dataAlign="right" dataSort={true}>Country</TableHeaderColumn>
        </BootstrapTable>

      </Panel>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    results: getAccountsQueryResults(state)
  }
}

export default connect(mapStateToProps)(AccountsList);
