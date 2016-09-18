import React, { Component } from 'react';
import { Panel, Table } from "react-bootstrap";

export default class ReferenceDataList extends Component {
  render() {
    return (
      <Panel collapsible defaultExpanded header="List">
        <Table responsive striped hover style={{ margin: 20 }}>
          <thead>
            <tr>
              <th>Account</th>
              <th>Account Name</th>
              <th>Currency</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>12345</td>
              <td>Fortis</td>
              <td>EUR</td>
              <td>3,000,000.00</td>
              <td>13/09/2016</td>
            </tr>
            <tr>
              <td>13456</td>
              <td>Barclays</td>
              <td>EUR</td>
              <td>50,000,000.00</td>
              <td>13/09/2016</td>
            </tr>
            <tr>
              <td>54321</td>
              <td>ING</td>
              <td>EUR</td>
              <td>1,000,000.00</td>
              <td>13/09/2016</td>
            </tr>
          </tbody>
        </Table>
      </Panel>
    );
  };
}
