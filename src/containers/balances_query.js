import React, { Component } from 'react';
import { Panel, Form, FormGroup, FormControl, Col, ControlLabel, Button } from "react-bootstrap";

export default class BalancesQuery extends Component {
  render() {
    return (
      <Panel collapsible defaultExpanded header="Query" bsStyle="success">
        <Form horizontal>
          <FormGroup controlId="account">
            <Col componentClass={ControlLabel} sm={2}>
              Account
            </Col>
            <Col sm={9}>
              <FormControl type="text" placeholder="Account: e.g. 12345" />
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
              <Button className="queryButton" type="submit">
                Query
              </Button>
              <Button className="queryButton" type="submit">
                Count
              </Button>
              <Button className="queryButton" type="submit">
                Reset
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Panel>
    );
  };
}
