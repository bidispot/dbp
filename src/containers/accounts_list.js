import React, { Component } from 'react';
import { Modal, Button, Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { getFavoriteAccount, getAccountsQueryResults } from '../selectors';
import { selectFavoriteAccount } from '../actions';

//Row select setting
let selectRowProp = {
  mode: "radio",
  clickToSelect: true,
  className: "selected-cell",
  onSelect: null
};

class AccountsList extends Component {

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
    return [...this.props.results].map((account) => {
      return account.toJS();
    });
  };

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
            search={true}
            exportCSV={true}
            selectRow={selectRowProp}>
            <TableHeaderColumn dataField="id" isKey={true} hidden={true} dataAlign="right" dataSort={true}>Id</TableHeaderColumn>
            <TableHeaderColumn dataField="account" dataAlign="right" dataSort={true}>Account</TableHeaderColumn>
            <TableHeaderColumn dataField="name" dataAlign="right" dataSort={true}>Name</TableHeaderColumn>
            <TableHeaderColumn dataField="currency" dataAlign="right" dataSort={true}>Currency</TableHeaderColumn>
            <TableHeaderColumn dataField="address" dataAlign="right" dataSort={true}>Address</TableHeaderColumn>
            <TableHeaderColumn dataField="country" dataAlign="right" dataSort={true}>Country</TableHeaderColumn>
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
    results: getAccountsQueryResults(state),
    favoriteAccount: getFavoriteAccount(state)
  }
}

export default connect(mapStateToProps, { selectFavoriteAccount })(AccountsList);
