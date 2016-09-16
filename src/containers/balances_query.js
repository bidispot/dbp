import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, Form, FormGroup, FormControl, Col, ControlLabel, Button } from "react-bootstrap";
import { queryBalances } from '../actions';
import { getCashBalancesQueryParameters } from '../selectors';

class BalancesQuery extends Component {

  constructor(props) {
    super(props);

    console.log(props.queryParameters);

    // This is the only place we are allowed to write this.state = ...
    this.state = {
      paramAccount: props.queryParameters.account,
      paramDateFrom: props.queryParameters.dateFrom,
      paramDateTo: props.queryParameters.dateTo
    };

    this.onAccountParameterChange = this.onAccountParameterChange.bind(this);
    this.onQuerySubmit = this.onQuerySubmit.bind(this);
  }

  onQuerySubmit(e) {
    this.props.queryBalances(this.buildQueryParametersFromLocalState());
    e.preventDefault();
  }

  onAccountParameterChange(e) {
    this.setState({ paramAccount: e.target.value });
  }

  buildQueryParametersFromLocalState() {
    return {
      account: this.state.paramAccount !== '' ? this.state.paramAccount : null,
      dateFrom: this.state.paramDateFrom !== '' ? this.state.paramDateFrom : null,
      dateTo: this.state.paramDateTo !== '' ? this.state.paramDateTo : null
    }
  }

  render() {
    return (
      <Panel collapsible defaultExpanded header="Query" bsStyle="success">
        <Form horizontal onSubmit={this.onQuerySubmit}>
          <FormGroup controlId="account">
            <Col componentClass={ControlLabel} sm={2}>
              Account
            </Col>
            <Col sm={9}>
              <FormControl type="text" placeholder="Account: e.g. 12345"
                value={this.state.paramAccount} onChange={this.onAccountParameterChange} />
            </Col>
          </FormGroup>

          <FormGroup controlId="date">
            <Col componentClass={ControlLabel} sm={2}>
              Date
            </Col>
            <Col sm={9}>
              <FormControl type="text" placeholder="Date with format: dd/mm/yyyy" />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button className="query-button" type="submit">
                Query
              </Button>
              <Button className="query-button" type="submit">
                Count
              </Button>
              <Button className="query-button" type="submit">
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
  return {
    queryParameters: getCashBalancesQueryParameters(state)
  }
}

export default connect(mapStateToProps, { queryBalances })(BalancesQuery);
