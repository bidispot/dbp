import React from 'react';
import { mount } from 'enzyme';
import { Button, FormControl } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import FontAwesome from 'react-fontawesome';
import dateUtils from '../../../../utils/dates';
import { ImmutableQueryParameters } from '../../model';
import { BalancesQueryView } from '../BalancesQueryView';

function setup() {
  const queryParameters = new ImmutableQueryParameters({
    account: "12345",
    dateFrom: 1234567000,
    dateTo: 9876543000
  });

  const minimumProps = {
    queryParameters,
    query: jest.fn()
  };

  const isQueryingProps = Object.assign({}, minimumProps, {
    isQuerying: true
  });

  const props = Object.assign({}, minimumProps, {
    isQuerying: false
  });

  const component = mount(<BalancesQueryView {...props} />);
  const componentWithOngoingQuery = mount(<BalancesQueryView {...isQueryingProps} />);

  return {
    props,
    component,
    isQueryingProps,
    componentWithOngoingQuery,
    minimumProps
  };
}

describe("balances", () => {
  describe("components", () => {
    describe("components", () => {

      it("should render the query parameters", () => {
        const { props, component } = setup();
        const { queryParameters } = props;
        const queryParamsJSON = queryParameters.toJSON();
        const expectedQueryParams = Object.assign({}, queryParamsJSON, {
          dateFrom: dateUtils.convertDateFromMillis(dateUtils.convertToUTCStartOfDay(queryParamsJSON.dateFrom)),
          dateTo: dateUtils.convertDateFromMillis(dateUtils.convertToUTCEndOfDay(queryParamsJSON.dateTo))
        });

        const accountControl = component.findWhere(n => n.props().controlId === 'account').find(FormControl);
        const dateFromControl = component.findWhere(n => n.props().controlId === 'date').find(DatePicker).first();
        const dateToControl = component.findWhere(n => n.props().controlId === 'date').find(DatePicker).last();

        // test values of components
        expect(accountControl.props().value).toEqual(expectedQueryParams.account);
        expect(dateFromControl.props().value).toEqual(expectedQueryParams.dateFrom);
        expect(dateToControl.props().value).toEqual(expectedQueryParams.dateTo);
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
        const expectedQueryParameters = {
          account: queryParameters.account,
          dateFrom: dateUtils.convertToUTCStartOfDay(queryParameters.dateFrom),
          dateTo: dateUtils.convertToUTCEndOfDay(queryParameters.dateTo)
        };

        const queryButton = component.find(Button).first();
        queryButton.simulate('submit');
        expect(query).toBeCalledWith(expectedQueryParameters);
      });

      it("should reset form when reset button is clicked", () => {
        const { component } = setup();

        const resetButton = component.find(Button).last();
        resetButton.simulate('click'); // onClick event is good

        const accountControl = component.findWhere(n => n.props().controlId === 'account').find(FormControl);
        const dateFromControl = component.findWhere(n => n.props().controlId === 'date').find(FormControl).first();
        const dateToControl = component.findWhere(n => n.props().controlId === 'date').find(FormControl).last();

        // test values of components
        expect(accountControl.props().value).toEqual('');
        expect(dateFromControl.props().value).toEqual('');
        expect(dateToControl.props().value).toEqual('');
      });

    });
  });
});
