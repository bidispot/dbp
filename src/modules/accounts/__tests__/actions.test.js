import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as t from '../actionTypes';
import * as actions from '../actions';
import api from '../../../middleware/api';
import errorsModule from '../../errors';
import balancesModule from '../../balances';

const middlewares = [ thunk, api ];
const mockStore = configureMockStore(middlewares);

describe('accounts', () => {
  describe('async actions', () => {
    beforeEach(function () {
      moxios.install()
    });

    afterEach(function () {
      moxios.uninstall()
    });

    const moxiosEmptyStub = () => {
      moxios.wait(() => {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: []
        });
      });
    };

    const moxiosFailureStub = () => {
      moxios.wait(() => {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 500
        });
      });
    };

    it('should create success action when querying accounts has been done', () => {
      moxiosEmptyStub();
      const store = mockStore({});

      const expectedActions = [
        { type: errorsModule.actions.types.RESET_MESSAGE },
        { type: t.QUERY, parameters: {} },
        { type: t.QUERY_SUCCESS, parameters: {}, response: { entities: {}, result: [] } }
      ];

      return store.dispatch(actions.query({})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('shoud create failure action when querying accounts has failed', () => {
      moxiosFailureStub();
      const store = mockStore({});

      const expectedActions = [
        { type: errorsModule.actions.types.RESET_MESSAGE },
        { type: t.QUERY, parameters: {} },
        { type: t.QUERY_FAILURE, parameters: {}, response: { errorMessage: "Unexpected error" } }
      ];

      return store.dispatch(actions.query({})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should create a select favourite account action when selecting an account as favourite', () => {
      moxiosFailureStub();
      const store = mockStore({});

      const account = { id: '12345', account: '12345', name: 'Test Account', currency: 'EUR', address: 'here', country: 'there' };

      const expectedActions = [
        { type: errorsModule.actions.types.RESET_MESSAGE },
        { type: t.SELECT_FAVORITE, account: account },
        { type: errorsModule.actions.types.RESET_MESSAGE },
        { type: balancesModule.actions.types.QUERY_CHARTS, parameters: { account: account.account } },
        { type: balancesModule.actions.types.QUERY_CHARTS_FAILURE, parameters: { account: account.account }, response: { errorMessage: "Unexpected error" } },
      ];

      return store.dispatch(actions.selectFavouriteAccount(account)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
