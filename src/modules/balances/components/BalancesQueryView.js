// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, Form, FormGroup, FormControl, Col, ControlLabel, Button } from "react-bootstrap";
import DatePicker from 'react-bootstrap-date-picker';
import FontAwesome from 'react-fontawesome';
import dateUtils from '../../../utils/dates';
import * as actions from '../actions';
import { getQueryParameters, getIsQuerying } from '../selectors';
import type { ImmutableQueryParameters  } from '../model';

type OwnProps = {|
  queryParameters: ImmutableQueryParameters,
  isQuerying: boolean
|};

type Props = OwnProps & {
  query: typeof actions.query
};

type State = {|
  paramAccount: ?string,
  paramDateFrom: ?number,
  paramDateTo: ?number,
  panelExpanded: boolean
|};

export class BalancesQueryView extends Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);

    // This is the only place we are allowed to write this.state = ...
    this.state = {
      paramAccount: props.queryParameters.getAccount() || '',
      paramDateFrom: dateUtils.convertToUTCStartOfDay(props.queryParameters.getDateFrom()),
      paramDateTo: dateUtils.convertToUTCEndOfDay(props.queryParameters.getDateTo()),
      panelExpanded: true
    };

    (this: any).onAccountParameterChange = this.onAccountParameterChange.bind(this);
    (this: any).onDateFromParameterChange = this.onDateFromParameterChange.bind(this);
    (this: any).onDateToParameterChange = this.onDateToParameterChange.bind(this);
    (this: any).togglePanel = this.togglePanel.bind(this);
    (this: any).onQuerySubmit = this.onQuerySubmit.bind(this);
    (this: any).onQueryReset = this.onQueryReset.bind(this);
  }

  onQuerySubmit(e: Object) {
    this.props.query(this.buildQueryParametersFromLocalState());
    e.preventDefault();
  }

  onQueryReset(e: Object) {
    // Resets internal state only
    this.setState({
      paramAccount: '',
      paramDateFrom: null,
      paramDateTo: null
    });

    e.preventDefault();
  }

  togglePanel() {
    this.setState({ panelExpanded: !this.state.panelExpanded });
  }

  onAccountParameterChange(e: Object) {
    this.setState({ paramAccount: e.target.value });
  }

  onDateFromParameterChange(date: Date) {
    this.setState({ paramDateFrom: dateUtils.convertToUTCStartOfDay(dateUtils.parseDateToMillis(date)) });
  }

  onDateToParameterChange(date: Date) {
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
      <Panel collapsible defaultExpanded header="Query" onSelect={this.togglePanel} expanded={this.state.panelExpanded} >
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

const mapStateToProps = (state): OwnProps => {
  return {
    queryParameters: getQueryParameters(state),
    isQuerying: getIsQuerying(state)
  }
}

export default connect(mapStateToProps, { query: actions.query })(BalancesQueryView);
