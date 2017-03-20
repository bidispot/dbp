import React from 'react';
import { mount } from 'enzyme';
import * as I from 'immutable';
import { BootstrapTable } from 'react-bootstrap-table';
import { ImmutableBalance } from '../../model';
import { BalancesListView } from '../BalancesListView';

function setup() {
  const results = I.List([
    new ImmutableBalance({
      id: 1,
      account: "12345",
      accountName: "Name12345",
      currency: "USD",
      amount: 1000,
      date: 1234567
    }),
    new ImmutableBalance({
      id: 2,
      account: "56789",
      currency: "EUR",
      accountName: "Name56789",
      amount: 2000,
      date: 9876543
    })
  ]);

  const props = {
    results
  };

  // deep rendering
  const component = mount(<BalancesListView {...props} />);

  return {
    props,
    component
  };
}

describe("balances", () => {
  describe("components", () => {
    describe("list view", () => {
      it("should list the results", () => {
        const { props, component } = setup();
        const { results } = props;

        // table data array contains as many elements as the number of results
        const table = component.find(BootstrapTable);
        expect(table.props().data.length).toBe(results.size);
      });
    });
  });
});
