// @flow
import { createSelector } from 'reselect';
import { NAME } from './constants';
import type { ImmutableBalanceMap, ImmutableBalanceIDList, ImmutableState } from './model';

const stateFrom = (rootState: any): ImmutableState => rootState[NAME];

const getAll = (rootState: any) => {
  return stateFrom(rootState).getEntities();
}
const getQuery = (rootState: any) => stateFrom(rootState).getQuery();
const getQueryResultIds = (rootState: any) => getQuery(rootState).getResultIDs();

export const getQueryParameters = (rootState: any) => getQuery(rootState).getParameters();
export const getIsQuerying = (rootState: any) => getQuery(rootState).getIsQuerying();

// Memoized selector that receives the state as argument and returns the list of
// Balance objects representing the Accounts query results.
export const getQueryResults = createSelector(
  [getAll, getQueryResultIds],
  (balances: ImmutableBalanceMap, ids: ImmutableBalanceIDList) => {
    return ids.map((id) => balances.get(id));
  }
);

const getCharts = (rootState: any) => stateFrom(rootState).getCharts();
const getChartResultIds = (rootState: any) => getCharts(rootState).getResultIDs();

export const getChartQueryParameters = (rootState: any) => getCharts(rootState).getParameters();

export const getChartResults = createSelector(
  [getAll, getChartResultIds],
  (balances: ImmutableBalanceMap, ids: ImmutableBalanceIDList) => {
    return ids.map((id) => balances.get(id));
  }
);
