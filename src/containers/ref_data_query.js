import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { Panel, Form, FormGroup, FormControl, Radio, Col, ControlLabel, Button } from "react-bootstrap";
import { fetchT7Data } from '../actions';

class ReferenceDataQuery extends Component {

  constructor(props) {
    super(props);

    this.state = {
      paramProduct: '',
      paramType: 'Futures'
    };

    this.onProductParameterChange = this.onProductParameterChange.bind(this);
    this.onQuerySubmit = this.onQuerySubmit.bind(this);
    this.onQueryReset = this.onQueryReset.bind(this);
    this.onSelectFuturesType = this.onSelectFuturesType.bind(this);
    this.onSelectOptionsType = this.onSelectOptionsType.bind(this);
  }

  onSelectFuturesType(e) {
    this.setState({ paramType: 'Futures' });
  }

  onSelectOptionsType(e) {
    this.setState({ paramType: 'Options' });
  }

  onQuerySubmit(e) {
    this.props.fetchT7Data();
    e.preventDefault();
  }

  onProductParameterChange(e) {
    this.setState({ paramProduct: e.target.value });
  }

  onQueryReset(e) {
    // Resets internal state only
    this.setState({
      paramProduct: ''
    });

    e.preventDefault();
  }

  render() {
    return (
      <Panel collapsible defaultExpanded header="Query" >
        <Form horizontal onSubmit={this.onQuerySubmit}>
          <FormGroup controlId="marketSegment">
            <Col componentClass={ControlLabel} sm={2}>
              Product search
            </Col>
            <Col sm={8}>
              <FormControl type="text" placeholder="e.g. Euro-bund (FGBL), Deutsche Boerse AG (DB1, DB1E, DB1H), DAX (FDAX)"
                value={this.state.paramProduct} onChange={this.onProductParameterChange}/>
            </Col>
          </FormGroup>

          <FormGroup controlId="securityType">
            <Col componentClass={ControlLabel} sm={2}>
              Type
            </Col>
            <Col sm={8}>
              <FormGroup className="radio-button-group">
                <Radio inline onChange={this.onSelectOptionsType} checked={this.state.paramType === 'Options'}>Options</Radio>
                {' '}
                <Radio inline onChange={this.onSelectFuturesType} checked={this.state.paramType === 'Futures'}>Futures</Radio>
              </FormGroup>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button className="query-button" type="submit">
                <FontAwesome name='search' /> Query
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

export default connect(null, { fetchT7Data })(ReferenceDataQuery);
