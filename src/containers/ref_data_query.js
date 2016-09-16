import React, { Component } from 'react';
import { Panel, Form, FormGroup, FormControl, Col, ControlLabel, Button } from "react-bootstrap";
import DatePicker from 'react-bootstrap-date-picker';

export default class ReferenceDataQuery extends Component {
  render() {
    return (
      <Panel collapsible defaultExpanded header="Query" bsStyle="warning">
        <Form horizontal>
          <FormGroup controlId="account">
            <Col componentClass={ControlLabel} sm={2}>
              Account
            </Col>
            <Col sm={8}>
              <FormControl type="text" placeholder="Account: e.g. 12345" />
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
              <DatePicker />
            </Col>
            <Col componentClass={FormControl.Static} sm={1} className="form-control-static-center">
              To
            </Col>
            <Col sm={3}>
              <DatePicker />
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
