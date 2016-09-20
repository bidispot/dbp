import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, Form, FormGroup, FormControl, Col, ControlLabel, Button } from "react-bootstrap";
import DatePicker from 'react-bootstrap-date-picker';
import FontAwesome from 'react-fontawesome';
import dateUtils from '../utils/dates';
import { queryBalances } from '../actions';
import { getCashBalancesQueryParameters, getIsCashBalancesQuerying } from '../selectors';


class BalancesQuery extends Component {

  constructor(props) {
    super(props);

    this.state = {
      paramAccount: props.queryParameters.account || '',
      paramDateFrom: props.queryParameters.dateFrom,
      paramDateTo: props.queryParameters.dateTo
    };

    this.onAccountParameterChange = this.onAccountParameterChange.bind(this);
    this.onDateFromParameterChange = this.onDateFromParameterChange.bind(this);
    this.onDateToParameterChange = this.onDateToParameterChange.bind(this);
    this.togglePanel = this.togglePanel.bind(this);
    this.onQuerySubmit = this.onQuerySubmit.bind(this);
    this.onQueryReset = this.onQueryReset.bind(this);
  }

  onQuerySubmit(e) {
    this.props.queryBalances(this.buildQueryParametersFromLocalState());
    this.setState({ panelCollapsed: false })
    e.preventDefault();
  }

  onQueryReset(e) {
    // Resets internal state only
    this.setState({
      paramAccount: '',
      paramDateFrom: null,
      paramDateTo: null
    });

    this.togglePanel();

    e.preventDefault();
  }

  togglePanel() {
    this.setState({ panelCollapsed: !this.state.panelCollapsed });
  }

  onAccountParameterChange(e) {
    this.setState({ paramAccount: e.target.value });
  }

  onDateFromParameterChange(date) {
    this.setState({ paramDateFrom: dateUtils.convertToUTCStartOfDay(dateUtils.parseDateToMillis(date)) });
  }

  onDateToParameterChange(date) {
    this.setState({ paramDateTo: dateUtils.convertToUTCEndOfDay(dateUtils.parseDateToMillis(date)) });
  }

  buildQueryParametersFromLocalState() {
    return {
      account: this.state.paramAccount !== '' ? this.state.paramAccount : null,
      dateFrom: this.state.paramDateFrom,
      dateTo: this.state.paramDateTo
    }
  }

  getQueryButtonIcon() {
    if (this.props.isQuerying) {
      return (<FontAwesome name='spinner' spin />);
    }
    return (<FontAwesome name='search' />);
  }

  render() {
    return (
      <Panel collapsible defaultExpanded header="Query" onSelect={this.togglePanel} expanded={this.state.panelCollapsed} >
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

          <FormGroup controlId="date">
            <Col componentClass={ControlLabel} sm={2}>
              Date
            </Col>
            <Col componentClass={FormControl.Static} sm={1} className="form-control-static-center">
              From
            </Col>
            <Col sm={3}>
              <DatePicker
                dateFormat="DD/MM/YYYY"
                value={dateUtils.convertDateFromMillis(this.state.paramDateFrom)}
                onChange={this.onDateFromParameterChange} />
            </Col>
            <Col componentClass={FormControl.Static} sm={1} className="form-control-static-center">
              To
            </Col>
            <Col sm={3}>
              <DatePicker
                dateFormat="DD/MM/YYYY"
                value={dateUtils.convertDateFromMillis(this.state.paramDateTo)}
                onChange={this.onDateToParameterChange} />
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
  return {
    queryParameters: getCashBalancesQueryParameters(state),
    isQuerying: getIsCashBalancesQuerying(state)
  }
}

export default connect(mapStateToProps, { queryBalances })(BalancesQuery);
