import I from 'immutable';
import { ImmutableState, ImmutableQuery, ImmutableQueryParameters, ImmutableBalance } from '../model';
import reducer from '../reducer';
import * as t from '../actionTypes';

const ENTITIES_DICTIONARY = {
  1: {
    id: 1,
    account: "12345",
    accountName: "Name12345",
    amount: 1000,
    currency: "EUR",
    date: 1234567
  },
  2: {
    id: 2,
    account: "56789",
    accountName: "Name56789",
    amount: 2000,
    currency: "USD",
    date: 9876543
  }
};

const RESULT_IDS = [1, 2];

const buildState = (
  isQuerying: boolean = false,
  queryResults: I.List<ImmutableBalance> = I.List(),
  queryParameters: ImmutableQueryParameters = new ImmutableQueryParameters(),
  isChartsQuerying: boolean = false,
  chartsQueryResults: I.List<ImmutableBalance> = I.List(),
  chartsQueryParameters: I.ImmutableQueryParameters = new ImmutableQueryParameters(),
  balanceEntities: I.Map<number, ImmutableBalance> = I.Map()) => {

  const query = new ImmutableQuery().setParameters(queryParameters).setIsQuerying(isQuerying).setResultIDs(queryResults);
  const chartsQuery = new ImmutableQuery().setParameters(chartsQueryParameters).setIsQuerying(isChartsQuerying).setResultIDs(chartsQueryResults);
  const state = new ImmutableState().setEntities(balanceEntities).setQuery(query).setCharts(chartsQuery);
  return state;
};

const buildImmutableStateAsJSON = (
  isQuerying: boolean = false,
  queryResults: I.List<number> = I.List(),
  queryParameters: ImmutableQueryParameters = new ImmutableQueryParameters(),
  isChartsQuerying: boolean = false,
  chartsQueryResults: I.List<number> = I.List(),
  chartsQueryParameters: ImmutableQueryParameters = new ImmutableQueryParameters(),
  balanceEntities: I.Map<number, ImmutableBalance> = I.Map()) => {

  return buildState(isQuerying, queryResults, queryParameters, isChartsQuerying, chartsQueryResults, chartsQueryParameters, balanceEntities).toJSON();
};

const buildImmutableQueryParameters = (account = '12345', dateFrom = 123456789, dateTo = 987654321) => {
  return new ImmutableQueryParameters({
    account,
    dateFrom,
    dateTo
  });
};

const buildImmutableBalanceEntities = (balanceEntitiesDictionary: {[_: string]: Object}): I.Map<string, ImmutableBalance> => {
  const entityKeys = Object.keys(balanceEntitiesDictionary);

  const alternatingKeyValueArray = entityKeys.map(key =>
    [balanceEntitiesDictionary[key].id, new ImmutableBalance(balanceEntitiesDictionary[key])]
  );

  return I.Map(alternatingKeyValueArray);
}

describe('balances', () => {
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

      const query = someState.getQuery();
      const charts = someState.getCharts();

      const expectedJSON = buildImmutableStateAsJSON(
        true, query.getResultIDs(), parameters,
        charts.getIsQuerying(), charts.getResultIDs(), charts.getParameters());

      expect(actualJSON).toEqual(expectedJSON);
    });

    it('should handle QUERY_CHARTS action with parameters', () => {
      const someState = buildState();
      const parameters = buildImmutableQueryParameters();
      const actualJSON = reducer(someState, {
        type: t.QUERY_CHARTS,
        parameters
      }).toJSON();

      const query = someState.getQuery();
      const charts = someState.getCharts();

      const expectedJSON = buildImmutableStateAsJSON(
        query.getIsQuerying(), query.getResultIDs(), query.getParameters(),
        true, charts.getResultIDs(), parameters);

      expect(actualJSON).toEqual(expectedJSON);
    });

    it('should handle QUERY_SUCCESS action', () => {
      const someState = buildState(
        true, I.List(), new ImmutableQueryParameters(),
        false, I.List(), new ImmutableQueryParameters());

      const results = RESULT_IDS;

      const actualJSON = reducer(someState, {
        type: t.QUERY_SUCCESS,
        response: { result: results, entities: { balances: {} } }
      }).toJSON();

      const query = someState.getQuery();
      const charts = someState.getCharts();

      const expectedJSON = buildImmutableStateAsJSON(
        false, results, query.getParameters(),
        charts.getIsQuerying(), charts.getResultIDs(), charts.getParameters());

      expect(actualJSON).toEqual(expectedJSON);
    });

    it('should handle QUERY_CHARTS_SUCCESS action', () => {
      const someState = buildState(
        false, I.List(), new ImmutableQueryParameters(),
        true, I.List(), new ImmutableQueryParameters());

      const results = RESULT_IDS;

      const actualJSON = reducer(someState, {
        type: t.QUERY_CHARTS_SUCCESS,
        response: { result: results, entities: { balances: {} } }
      }).toJSON();

      const query = someState.getQuery();
      const charts = someState.getCharts();

      const expectedJSON = buildImmutableStateAsJSON(
        query.getIsQuerying(), query.getResultIDs(), query.getParameters(),
        false, results, charts.getParameters());

      expect(actualJSON).toEqual(expectedJSON);
    });

    it('should handle QUERY_FAILURE action', () => {
      const someState = buildState(
        true, I.List(), new ImmutableQueryParameters(),
        false, I.List(), new ImmutableQueryParameters());

      const actualJSON = reducer(someState, {
        type: t.QUERY_FAILURE,
        response: { errorMessage: 'whatever' }
      }).toJSON();

      const query = someState.getQuery();
      const charts = someState.getCharts();

      const expectedJSON = buildImmutableStateAsJSON(
        false, query.getResultIDs(), query.getParameters(),
        charts.getIsQuerying(), charts.getResultIDs(), charts.getParameters());

      expect(actualJSON).toEqual(expectedJSON);
    });

    it('should handle QUERY_CHARTS_FAILURE action', () => {
      const someState = buildState(
        false, I.List(), new ImmutableQueryParameters(),
        true, I.List(), new ImmutableQueryParameters());

      const actualJSON = reducer(someState, {
        type: t.QUERY_CHARTS_FAILURE,
        response: { errorMessage: 'whatever' }
      }).toJSON();

      const query = someState.getQuery();
      const charts = someState.getCharts();

      const expectedJSON = buildImmutableStateAsJSON(
        query.getIsQuerying(), query.getResultIDs(), query.getParameters(),
        false, charts.getResultIDs(), charts.getParameters());

      expect(actualJSON).toEqual(expectedJSON);
    });

    it('should keep previously added entities', () => {
      const isQuerying = true;
      const queryResults = I.List();
      const queryParameters = new ImmutableQueryParameters();
      const balanceEntities = buildImmutableBalanceEntities(ENTITIES_DICTIONARY);

      const existingState = buildState(isQuerying, queryResults, queryParameters, false, I.List(), new ImmutableQueryParameters(), balanceEntities);
      const actualJSON = reducer(existingState, {}).toJSON();

      const charts = existingState.getCharts();

      const expectedJSON = buildImmutableStateAsJSON(
        isQuerying, queryResults, queryParameters,
        charts.getIsQuerying(), charts.getResultIDs(), charts.getParameters(),
        balanceEntities);

      expect(actualJSON).toEqual(expectedJSON);
    });

    it('should handle adding entities from results', () => {
      const isQuerying = true;
      const queryResults = I.List();
      const queryParameters = new ImmutableQueryParameters();
      const balanceEntities = I.Map();

      const existingState = buildState(isQuerying, queryResults, queryParameters, false, I.List(), new ImmutableQueryParameters(), balanceEntities);
      const newResultEntities = ENTITIES_DICTIONARY;
      const actualJSON = reducer(existingState, {
        type: t.QUERY_SUCCESS,
        response: {
          entities: {
            balances: newResultEntities
          }
        }
      }).toJSON();

      const charts = existingState.getCharts();

      const expectedJSON = buildImmutableStateAsJSON(
        false, queryResults, queryParameters,
        charts.getIsQuerying(), charts.getResultIDs(), charts.getParameters(),
        buildImmutableBalanceEntities(ENTITIES_DICTIONARY));

      expect(actualJSON).toEqual(expectedJSON);
    });

    it('should handle updating entities', () => {
      // initial state
      const someBalance = new ImmutableBalance({
        id: 9,
        account: "99999",
        accountName: "Name99999",
        amount: 4400,
        currency: "JPY",
        date: 987798789
      });
      let existingBalanceEntities = buildImmutableBalanceEntities(ENTITIES_DICTIONARY);
      existingBalanceEntities = existingBalanceEntities.set(someBalance.id, someBalance);

      const isQuerying = true;
      const queryResults = I.List();
      const queryParameters = new ImmutableQueryParameters();

      const existingState = buildState(isQuerying, queryResults, queryParameters, false, I.List(), new ImmutableQueryParameters(), existingBalanceEntities);

      // results
      const modifiedBalance = someBalance.setAccountName('Updated Name99999');
      const newResultEntities = {
        [modifiedBalance.getId()]: modifiedBalance.toJSON()
      }

      // actual vs expected
      const actualJSON = reducer(existingState, {
        type: t.QUERY_SUCCESS,
        response: {
          entities: {
            balances: newResultEntities
          }
        }
      }).toJSON();

      const expectedEntities = existingState.getEntities().mergeDeep(buildImmutableBalanceEntities(newResultEntities));
      const charts = existingState.getCharts();

      const expectedJSON = buildImmutableStateAsJSON(
        false, queryResults, queryParameters,
        charts.getIsQuerying(), charts.getResultIDs(), charts.getParameters(),
        expectedEntities);

      expect(actualJSON).toEqual(expectedJSON);
    });

  });
});
