import I from 'immutable';
import { ImmutableState, ImmutableQuery, ImmutableQueryParameters, ImmutableAccount } from '../model';
import reducer from '../reducer';
import * as t from '../actionTypes';

const ENTITIES_DICTIONARY = {
  "12345": {
    id: "12345",
    account: "12345",
    name: "Name12345",
    address: "address 12345",
    country: "Luxembourg",
    currency: "EUR"
  },
  "56789": {
    id: "56789",
    account: "56789",
    name: "Name56789",
    address: "address 56789",
    country: "USA",
    currency: "USD"
  }
};

const RESULT_IDS = ["12345", "56789"];

const buildState = (
  isQuerying: boolean = false,
  queryResults: I.List<string> = I.List(),
  queryParameters: ImmutableQueryParameters = new ImmutableQueryParameters(),
  accountEntities: I.Map<string, ImmutableAccount> = I.Map(),
  favouriteAccount = ImmutableAccount): ImmutableState => {

  const query = new ImmutableQuery().setParameters(queryParameters).setIsQuerying(isQuerying).setResultIDs(queryResults);
  const state = new ImmutableState().setEntities(accountEntities).setFavourite(null).setQuery(query);
  return state;
};

const buildImmutableStateAsJSON = (
  isQuerying: boolean = false,
  queryResults: I.List<string> = I.List(),
  queryParameters: ImmutableQueryParameters = new ImmutableQueryParameters(),
  accountEntities: I.Map<string, ImmutableAccount> = I.Map(),
  favouriteAccount = ImmutableAccount): ImmutableState => {

  return buildState(isQuerying, queryResults, queryParameters, accountEntities, favouriteAccount).toJSON();
};

const buildImmutableQueryParameters = (account = '12345', name = 'Test Name', currency = 'EUR') => {
  return new ImmutableQueryParameters({
    account,
    name,
    currency
  });
};

const buildImmutableAccountEntities = (accountEntitiesDictionary: {[_: string]: Object}): I.Map<string, ImmutableAccount> => {
  const entityKeys = Object.keys(accountEntitiesDictionary);

  const alternatingKeyValueArray = entityKeys.map(key =>
    [accountEntitiesDictionary[key].id, new ImmutableAccount(accountEntitiesDictionary[key])]
  );

  return I.Map(alternatingKeyValueArray);
}

describe('accounts', () => {
  describe('reducer', () => {

    it('should return the initial state', () => {
      const expectedInitialStateInJSON = buildImmutableStateAsJSON();
      expect(reducer(undefined, {}).toJSON()).toEqual(expectedInitialStateInJSON);
    });

    it('should handle QUERY action with parameters', () => {
      const someState = buildState();
      const parameters = buildImmutableQueryParameters();
      const actualJSON = reducer(someState, {
        type: t.QUERY,
        parameters
      }).toJSON();
      const expectedJSON = buildImmutableStateAsJSON(true, someState.getQuery().getResultIDs(), parameters);

      expect(actualJSON).toEqual(expectedJSON);
    });

    it('should handle QUERY_SUCCESS action', () => {
      const someState = buildState(true);
      const results = RESULT_IDS;

      const actualJSON = reducer(someState, {
        type: t.QUERY_SUCCESS,
        response: { result: results, entities: { accounts: {} } }
      }).toJSON();
      const expectedJSON = buildImmutableStateAsJSON(false, results, someState.getQuery().getParameters());

      expect(actualJSON).toEqual(expectedJSON);
    });

    it('should handle QUERY_FAILURE action', () => {
      const someState = buildState(true);
      const actualJSON = reducer(someState, {
        type: t.QUERY_FAILURE,
        response: { errorMessage: 'whatever' }
      }).toJSON();
      const expectedJSON = buildImmutableStateAsJSON(false, someState.getQuery().getResultIDs(), someState.getQuery().getParameters());

      expect(actualJSON).toEqual(expectedJSON);
    });

    it('should keep previously added entities', () => {
      const isQuerying = true;
      const queryResults = I.List();
      const queryParameters = new ImmutableQueryParameters();
      const accountEntities = buildImmutableAccountEntities(ENTITIES_DICTIONARY);
      const favouriteAccount = null;

      const existingState = buildState(isQuerying, queryResults, queryParameters, accountEntities, favouriteAccount);
      const actualJSON = reducer(existingState, {}).toJSON();
      const expectedJSON = buildImmutableStateAsJSON(isQuerying, queryResults, queryParameters, accountEntities, favouriteAccount);

      expect(actualJSON).toEqual(expectedJSON);
    });

    it('should handle adding entities from results', () => {
      const isQuerying = true;
      const queryResults = I.List();
      const queryParameters = new ImmutableQueryParameters();
      const accountEntities = I.Map();
      const favouriteAccount = null;

      const existingState = buildState(isQuerying, queryResults, queryParameters, accountEntities, favouriteAccount);
      const newResultEntities = ENTITIES_DICTIONARY;
      const actualJSON = reducer(existingState, {
        type: t.QUERY_SUCCESS,
        response: {
          entities: {
            accounts: newResultEntities
          }
        }
      }).toJSON();
      const expectedJSON = buildImmutableStateAsJSON(false, queryResults, queryParameters, buildImmutableAccountEntities(ENTITIES_DICTIONARY), favouriteAccount);

      expect(actualJSON).toEqual(expectedJSON);
    });

    it('should handle updating entities', () => {
      // initial state
      const someAccount = new ImmutableAccount({
        id: "99999",
        account: "99999",
        name: "Name99999",
        address: "address 99999",
        country: "USA",
        currency: "USD"
      });
      let existingAccountEntities = buildImmutableAccountEntities(ENTITIES_DICTIONARY);
      existingAccountEntities = existingAccountEntities.set(someAccount.id, someAccount);

      const isQuerying = true;
      const queryResults = I.List();
      const queryParameters = new ImmutableQueryParameters();
      const favouriteAccount = null;

      const existingState = buildState(isQuerying, queryResults, queryParameters, existingAccountEntities, favouriteAccount);

      // results
      const modifiedAccount = someAccount.setName('Updated Name99999');
      const newResultEntities = {
        [modifiedAccount.getId()]: modifiedAccount.toJSON()
      }

      // actual vs expected
      const actualJSON = reducer(existingState, {
        type: t.QUERY_SUCCESS,
        response: {
          entities: {
            accounts: newResultEntities
          }
        }
      }).toJSON();

      const expectedEntities = existingState.getEntities().mergeDeep(buildImmutableAccountEntities(newResultEntities));
      const expectedJSON = buildImmutableStateAsJSON(false, queryResults, queryParameters, expectedEntities, favouriteAccount);

      expect(actualJSON).toEqual(expectedJSON);
    });

  });
});
