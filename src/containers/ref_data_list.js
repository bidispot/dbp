import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel } from "react-bootstrap";
import { getT7QueryResults } from '../selectors';

class ReferenceDataList extends Component {

  render() {
    if (!this.props.results || this.props.results.size === 0) {
      return (
        <Panel collapsible defaultExpanded header="Overview">
          <div>Please select a product (future or option).
            <br />
            <a href="http://cts.deutsche-boerse.de/rjs" target="blank">EUREX T7 API</a> will be called to get the results.
            <br />
            This URL is only accessible from within the DBG Office Automation network.
          </div>
        </Panel>
      );
    }

    return (
      <Panel collapsible defaultExpanded header="Overview">

      </Panel>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    results: getT7QueryResults(state)
  }
}

export default connect(mapStateToProps, { getT7QueryResults })(ReferenceDataList);
