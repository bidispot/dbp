import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, Form, FormGroup, FormControl, Col, ControlLabel, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { queryAccounts } from '../actions';
import { getAccountsQueryParameters, getIsAccountsQuerying } from '../selectors';


class AccountsQuery extends Component {

  constructor(props) {
    super(props);

    // This is the only place we are allowed to write this.state = ...
    this.state = {
      paramAccount: props.queryParameters.account || '',
      paramName: props.queryParameters.name || '',
      paramCurrency: props.queryParameters.currency || ''
    };

    this.onAccountParameterChange = this.onAccountParameterChange.bind(this);
    this.onNameParameterChange = this.onNameParameterChange.bind(this);
    this.onCurrencyParameterChange = this.onCurrencyParameterChange.bind(this);
    this.onQuerySubmit = this.onQuerySubmit.bind(this);
    this.onQueryReset = this.onQueryReset.bind(this);
  }

  onQuerySubmit(e) {
    this.props.queryAccounts(this.buildQueryParametersFromLocalState());
    e.preventDefault();
  }

  onQueryReset(e) {
    // Resets internal state only
    this.setState({
      paramAccount: '',
      paramName: '',
      paramCurrency: ''
    });

    e.preventDefault();
  }

  onAccountParameterChange(e) {
    this.setState({ paramAccount: e.target.value });
  }

  onNameParameterChange(e) {
    this.setState({ paramName: e.target.value });
  }

  onCurrencyParameterChange(e) {
    this.setState({ paramCurrency: e.target.value });
  }

  buildQueryParametersFromLocalState() {
    return {
      account: this.state.paramAccount !== '' ? this.state.paramAccount : null,
      name: this.state.paramName !== '' ? this.state.paramName : null,
      currency: this.state.paramCurrency !== '' ? this.state.paramCurrency : null
    }
  }

  getQueryButtonIcon() {
    console.log(this.props.isQuerying);
    if (this.props.isQuerying) {
      return (<FontAwesome name='spinner' spin />);
    }
    return (<FontAwesome name='search' />);
  }

  render() {
    return (
      <Panel collapsible defaultExpanded header="Query" bsStyle="info">
        <Form horizontal onSubmit={this.onQuerySubmit}>
          <FormGroup controlId="account">
            <Col componentClass={ControlLabel} sm={2}>
              Account
            </Col>
            <Col sm={8}>
              <FormControl type="text" placeholder="Account: e.g. 12345"
                value={this.state.paramAccount} onChange={this.onAccountParameterChange} />
            </Col>
          </FormGroup>

          <FormGroup controlId="name">
            <Col componentClass={ControlLabel} sm={2}>
              Account Name
            </Col>
            <Col sm={8}>
              <FormControl type="text" placeholder="Account Name: e.g. UBS"
                value={this.state.paramName} onChange={this.onNameParameterChange} />
            </Col>
          </FormGroup>

          <FormGroup controlId="currency">
            <Col componentClass={ControlLabel} sm={2}>
              Currency
            </Col>
            <Col sm={8}>
              <FormControl componentClass="select" value={this.state.paramCurrency} onChange={this.onCurrencyParameterChange}>
                <option value="">Any</option>
                <option value="EUR">Euro (EUR - €)</option>
                <option value="USD">US Dollar (USD - $)</option>
                <option value="GBP">British Pound (GBP - £)</option>
              </FormControl>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button className="query-button" type="submit">
                {this.getQueryButtonIcon()} Query
              </Button>
              <Button className="query-button" type="submit" onClick={this.onQueryReset}>
                Reset
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Panel>
    );
  };
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    queryParameters: getAccountsQueryParameters(state),
    isQuerying: getIsAccountsQuerying(state)
  }
}

export default connect(mapStateToProps, { queryAccounts })(AccountsQuery);
