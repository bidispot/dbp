import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Button, FormControl } from 'react-bootstrap';
import { reducer as formReducer } from 'redux-form';
import FontAwesome from 'react-fontawesome';
import { ImmutableQueryParameters } from '../../model';
import { AccountsQueryViewWithForm, validate } from '../AccountsQueryView';
import { nodeWithIntlProp, mountWithIntl } from '../../../../__dev__/test_intl';

function setup() {
  const queryParameters = new ImmutableQueryParameters({
    account: "12345",
    name: 'Name12345',
    currency: 'USD'
  });

  const minimumProps = {
    queryParameters,
    initialValues: {
      paramAccount: queryParameters.getAccount(),
      paramName: queryParameters.getName(),
      paramCurrency: queryParameters.getCurrency()
    },
    query: jest.fn()
  };

  const isQueryingProps = Object.assign({}, minimumProps, {
    isQuerying: true
  });

  const props = Object.assign({}, minimumProps, {
    isQuerying: false
  });

  const wrapWithProvider = (reactElement) => {
    const store = createStore(combineReducers({ form: formReducer }));
    const withIntl = nodeWithIntlProp(reactElement);

    return (
      <Provider store={store}>
        {withIntl}
      </Provider>
    );
  };

  const component = mountWithIntl(wrapWithProvider(<AccountsQueryViewWithForm {...props} />));
  const componentWithOngoingQuery = mountWithIntl(wrapWithProvider(<AccountsQueryViewWithForm {...isQueryingProps} />));

  return {
    props,
    component,
    isQueryingProps,
    componentWithOngoingQuery,
    minimumProps
  };
}

describe("accounts", () => {
  describe("components", () => {
    describe("query view", () => {

      describe("validation", () => {
        it("should pass validation if account parameter is not present", () => {
          const errors = validate({});
          expect(errors.paramAccount).toBeUndefined();
        });

        it("should pass validation if account parameter is not longer than five chars", () => {
          const errors = validate({
            paramAccount: '12345'
          });
          expect(errors.paramAccount).toBeUndefined();
        });

        it("should fail validation if account parameter is longer than five chars", () => {
          const errors = validate({
            paramAccount: '123456'
          });
          expect(errors.paramAccount).toBeDefined();
        });
      });

      it("should render the query parameters", () => {
        const { props, component } = setup();

        const accountControl = component.findWhere(n => n.props().controlId === 'account').find(FormControl);
        const nameControl = component.findWhere(n => n.props().controlId === 'name').find(FormControl);
        const currencyControl = component.findWhere(n => n.props().controlId === 'currency').find(FormControl);

        // test values of components
        expect(accountControl.props().value).toEqual(props.queryParameters.getAccount());
        expect(nameControl.props().value).toEqual(props.queryParameters.getName());
        expect(currencyControl.props().value).toEqual(props.queryParameters.getCurrency());
      });

      it("should render the loading indicator when waiting", () => {
        const { componentWithOngoingQuery: component } = setup();

        const buttons = component.find(Button);

        // test query button icon
        const fontAwesome = buttons.first().find(FontAwesome);
        expect(fontAwesome.props().name).toEqual("spinner");
        expect(fontAwesome.props().spin).toBe(true);
      });

      it("should not render the loading indicator when not waiting", () => {
        const { component } = setup();

        const queryButton = component.find(Button).first();

        // test query button icon
        const fontAwesome = queryButton.find(FontAwesome);
        expect(fontAwesome.props().name).toEqual("search");
        expect(fontAwesome.props().spin).toBeUndefined();
      });

      it("should call query action when query button is clicked", () => {
        const { props, component } = setup();
        const { queryParameters, query } = props;

        const queryButton = component.find(Button).first();
        queryButton.simulate('submit');
        expect(query).toBeCalledWith(queryParameters.toJSON());
      });

      it("should execute the correct query when query parameters change and query button is clicked", () => {
        const { props, component } = setup();
        const { query } = props;

        // Change query screen state by simulating user selection and then execute query
        const newQueryParameters = {
          account: "99999",
          name: "Name99999",
          currency: "EUR"
        };

        const accountControl = component.findWhere(n => n.props().controlId === 'account').find(FormControl);
        const nameControl = component.findWhere(n => n.props().controlId === 'name').find(FormControl);
        const currencyControl = component.findWhere(n => n.props().controlId === 'currency').find(FormControl);

        accountControl.simulate('change', { target: { value: newQueryParameters.account } });
        nameControl.simulate('change', { target: { value: newQueryParameters.name } });
        currencyControl.simulate('change', { target: { value: newQueryParameters.currency } });

        // execute query
        const queryButton = component.find(Button).first();
        queryButton.simulate('submit');

        // action query accounts must be called with the changed query parameters
        expect(query).toBeCalledWith(newQueryParameters);
      });

      it("should reset form when reset button is clicked", () => {
        const { component } = setup();

        const resetButton = component.find(Button).last();
        resetButton.simulate('click'); // onClick event is good

        const accountControl = component.findWhere(n => n.props().controlId === 'account').find(FormControl);
        const nameControl = component.findWhere(n => n.props().controlId === 'name').find(FormControl);
        const currencyControl = component.findWhere(n => n.props().controlId === 'currency').find(FormControl);

        // test values of components
        expect(accountControl.props().value).toEqual('');
        expect(nameControl.props().value).toEqual('');
        expect(currencyControl.props().value).toEqual('');
      });

      it("should not render error message when account parameter is not longer than five chars", () => {
        const { component } = setup(); // account = 12345

        const errorSpan = component.findWhere(n => n.props().controlId === 'account').find('span.error');
        expect(errorSpan.isEmpty()).toBe(true);
      });

      it("should render error message when account parameter is longer than five chars", () => {
        const { component } = setup();

        // Normally we would test the state of the component by setting it up with the
        // invalid values and without having to simulate the change event; we are lazy :-)
        // Put an invalid account value:
        const accountControl = component.findWhere(n => n.props().controlId === 'account').find(FormControl);
        accountControl.simulate('change', { target: { value:'123456' } });

        const errorSpan = component.findWhere(n => n.props().controlId === 'account').find('span.text-danger');
        expect(errorSpan.isEmpty()).toBe(false);
        expect(errorSpan.text()).toBeDefined();
        expect(errorSpan.text().length).toBeGreaterThan(0); // not testing the exact message
      });
    });
  });
});
