import React from 'react';
import { BootstrapTable } from 'react-bootstrap-table';
import * as I from 'immutable';
import { ImmutableAccount } from '../../model';
import { AccountsListView } from '../AccountsListView';
import { mountWithIntl } from '../../../../__dev__/test_intl';

function setup() {
  const results = I.List([
    new ImmutableAccount({
      id: "12345",
      account: "12345",
      name: "Name12345",
      address: "address 12345",
      country: "Luxembourg",
      currency: "EUR"
    }),
    new ImmutableAccount({
      id: "56789",
      account: "56789",
      name: "Name56789",
      address: "address 56789",
      country: "USA",
      currency: "USD"
    })
  ]);

  const favouriteAccount = new ImmutableAccount({
      id: "12345",
      account: "12345",
      name: "Name12345",
      address: "address 12345",
      country: "Luxembourg",
      currency: "EUR"
  });

  const minimumProps = {
    results,
    selectFavouriteAccount: jest.fn()
  };

  // VS Code does not support spread initializer yet
  const props = Object.assign({}, minimumProps, { favouriteAccount });

  // deep rendering
  const component = mountWithIntl(<AccountsListView {...props} />);

  // deep rendering
  const componentWithoutFavouriteAccount = mountWithIntl(<AccountsListView {...minimumProps} />);

  return {
    props,
    component,
    componentWithoutFavouriteAccount
  };
}

describe("accounts", () => {
  describe("components", () => {
    describe("list view", () => {

      it("should list the results", () => {
        const { props, component } = setup();
        const { results } = props;

        // table data array contains as many elements as the number of results
        const table = component.find(BootstrapTable);
        expect(table.props().data.length).toBe(results.size);
      });

      it("should render the favourite account", () => {
        const { props, component } = setup();

        // textual representation of favourite account component contains the favourite account name
        const favAccountComponent = component.find(".select-favorite-table");
        expect(favAccountComponent.text()).toContain(props.favouriteAccount.getName());
      });

      it("should not render the favourite account", () => {
        const { props, componentWithoutFavouriteAccount } = setup();

        // textual representation of favourite account component does not contain the favourite account name
        const favAccountComponent = componentWithoutFavouriteAccount.find(".select-favorite-table");
        expect(favAccountComponent.text()).not.toContain(props.favouriteAccount.name);
      });

      it("should execute select favourite account action when row is clicked", () => {
        const { props, component } = setup();
        const { results, selectFavouriteAccount } = props;

        // calls dispatch with selectFavoriteAccount containing the first result
        const firstRow = component.find('TableRow').first();
        firstRow.simulate('click');
        expect(selectFavouriteAccount).toBeCalledWith(results.get(0).toJSON());
      });

    });
  });
});
