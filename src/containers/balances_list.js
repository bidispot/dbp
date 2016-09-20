import React, { Component } from 'react';
import { Modal, Button, Panel } from 'react-bootstrap';
import {  BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { connect } from 'react-redux';
import moment from 'moment';
import numeral from 'numeral';
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

    this.state = { showModal: false };

    this.onSelectRow = this.onSelectRow.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.renderPopupText = this.renderPopupText.bind(this);
    selectRowProp.onSelect = this.onSelectRow;
  }

  closeModal() {
    this.setState({ showModal: false });
    selectRowProp.selected = [];
  }

  openModal() {
    this.setState({ showModal: true });
  }

  onSelectRow(row, selected) {
    this.openModal(row);
    this.props.selectFavoriteAccount(row);
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

  renderPopupText() {
    if (this.props.favoriteAccount) {
      return (
        `Account ${this.props.favoriteAccount.accountName} is the new favorite.`
      );
    } else {
      return ("");
    }
  }

  render() {
    if (!this.props.results || this.props.results.size === 0) {
      return (
        <Panel collapsible defaultExpanded header="List">
          <div>No rows available</div>
        </Panel>
      );
    }

    return (
      <div>
        <Panel collapsible defaultExpanded header="List">
          <div className="col-lg-9 col-md-10 select-favorite-table">
            Click to select your favorite account
          </div>
          <BootstrapTable
            data={this.asJson() }
            striped={true}
            hover={true}
            condensed={true}
            pagination={true}
            search={true}
            exportCSV={true}
            selectRow={selectRowProp}>
            <TableHeaderColumn dataField="id" isKey={true} hidden={true} dataAlign="right" dataSort={true}>Id</TableHeaderColumn>
            <TableHeaderColumn dataField="account" dataAlign="right" dataSort={true}>Account</TableHeaderColumn>
            <TableHeaderColumn dataField="accountName" dataAlign="right" dataSort={true}>Account Name</TableHeaderColumn>
            <TableHeaderColumn dataField="amount" dataAlign="right" dataSort={true} dataFormat={this.amountFormatter}>Amount</TableHeaderColumn>
            <TableHeaderColumn dataField="currency" dataAlign="right" hidden={true}>Currency</TableHeaderColumn>
            <TableHeaderColumn dataField="date" dataAlign="right" dataSort={true} dataFormat={this.dateFormatter}>Date</TableHeaderColumn>
          </BootstrapTable>
        </Panel>
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Preferences</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Your new favorite account has been selected</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
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
