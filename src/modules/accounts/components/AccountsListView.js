// @flow
import React, { Component } from 'react';
import * as I from 'immutable';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Modal, Button, Panel } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { getFavouriteAccount, getQueryResults } from '../selectors';
import * as actions from '../actions';
import type { Account, ImmutableAccount  } from '../model';
import { Keys } from './AccountsListView_messages';
import appMsg, { Keys as AppKeys } from '../../../i18n/keys';
import type { PropsWithIntl } from '../../../types';

type OwnProps = {|
  results: I.List<ImmutableAccount>,
  favouriteAccount: ?ImmutableAccount
|};

type Props = PropsWithIntl<OwnProps & {
  selectFavouriteAccount: typeof actions.selectFavouriteAccount
}>;

type State = {|
  showModal: boolean
|};

// Row selection settings
let selectRowProp: {
  mode: string,
  clickToSelect: true,
  className: string,
  onSelect: ?((row: Account, isSelected: boolean, event: Object) => void)
} = {
  mode: "radio",
  clickToSelect: true,
  className: "selected-cell",
  onSelect: null
};

export class AccountsListView extends Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = { showModal: false };

    (this: any).onSelectRow = this.onSelectRow.bind(this);
    (this: any).openModal = this.openModal.bind(this);
    (this: any).closeModal = this.closeModal.bind(this);
    (this: any).displayFavouriteAccount = this.displayFavouriteAccount.bind(this);
    selectRowProp.onSelect = this.onSelectRow;
  }

  displayFavouriteAccount() {
    if (this.props.favouriteAccount) {
      return (
        <span> <FormattedMessage id={Keys.MESSAGES_SELECTEDFAVOURITEACCOUNT} /> <span className="teal">{this.props.favouriteAccount.getName()}</span></span>
      );
    } else {
      return "";
    }
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  openModal() {
    this.setState({ showModal: true });
  }

  onSelectRow(row: Account, isSelected: boolean, event: Object) {
    this.openModal(row);
    this.props.selectFavouriteAccount(row);
  }

  resultsAsJson(): Array<Account> {
    return this.props.results.toJS();
  }

  render() {
    if (!this.props.results || this.props.results.size === 0) {
      return (
        <Panel collapsible defaultExpanded header={this.props.intl.formatMessage(appMsg(AppKeys.VIEWS_LIST_HEADER_TITLE))}>
          <div><FormattedMessage id={AppKeys.VIEWS_LIST_MESSAGES_NORESULTS} /></div>
        </Panel>
      );
    }

    return (
      <div>
        <Panel collapsible defaultExpanded header="List">
          <div className="col-lg-9 col-md-10 select-favorite-table">
            <FormattedMessage id={Keys.MESSAGES_CLICKTOSELECTFAVOURITEACCOUNT} /> { this.displayFavouriteAccount() }
          </div>
          <BootstrapTable
            data={this.resultsAsJson() }
            striped={true}
            hover={true}
            condensed={true}
            search={true}
            exportCSV={true}
            selectRow={selectRowProp}>
            <TableHeaderColumn dataField="id" isKey={true} hidden={true} dataAlign="right" dataSort={true}>Id</TableHeaderColumn>
            <TableHeaderColumn dataField="account" dataAlign="right" dataSort={true}><FormattedMessage id={Keys.LIST_COLUMNS_ACCOUNT_HEADER} /></TableHeaderColumn>
            <TableHeaderColumn dataField="name" dataAlign="right" dataSort={true}><FormattedMessage id={Keys.LIST_COLUMNS_ACCOUNTNAME_HEADER} /></TableHeaderColumn>
            <TableHeaderColumn dataField="currency" dataAlign="right" dataSort={true}><FormattedMessage id={Keys.LIST_COLUMNS_CURRENCY_HEADER} /></TableHeaderColumn>
            <TableHeaderColumn dataField="address" dataAlign="right" dataSort={true}><FormattedMessage id={Keys.LIST_COLUMNS_ADDRESS_HEADER} /></TableHeaderColumn>
            <TableHeaderColumn dataField="country" dataAlign="right" dataSort={true}><FormattedMessage id={Keys.LIST_COLUMNS_COUNTRY_HEADER} /></TableHeaderColumn>
          </BootstrapTable>
        </Panel>
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title><FormattedMessage id={Keys.POPUPS_FAVOURITEACCOUNT_HEADER} /></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4><FormattedMessage id={Keys.MESSAGES_NEWFAVOURITEACCOUNTSELECTED} /></h4>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}><FormattedMessage id={AppKeys.VIEWS_POPUP_BUTTONS_CLOSE} /></Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };
};

const mapStateToProps = (state): OwnProps => {
  return {
    results: getQueryResults(state),
    favouriteAccount: getFavouriteAccount(state)
  };
};

export default connect(mapStateToProps, { selectFavouriteAccount: actions.selectFavouriteAccount })(injectIntl(AccountsListView));
