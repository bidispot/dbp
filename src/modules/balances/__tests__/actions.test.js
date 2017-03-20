import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as t from '../actionTypes';
import * as actions from '../actions';
import api from '../../../middleware/api';
import errorsModule from '../../errors';

const middlewares = [ thunk, api ];
const mockStore = configureMockStore(middlewares);

describe('balances', () => {
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

    it('should create success action when querying balances has been done', () => {
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

    it('shoud create failure action when querying balances has failed', () => {
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

  });
});
