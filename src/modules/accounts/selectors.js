// @flow
import { createSelector } from 'reselect';
import { NAME } from './constants';
import type { ImmutableAccountMap, ImmutableAccountIDList, ImmutableState } from './model';

const stateFrom = (rootState: any): ImmutableState => rootState[NAME];

const getAll = (rootState: any) => stateFrom(rootState).getEntities();
const getQuery = (rootState: any) => stateFrom(rootState).getQuery();
const getQueryResultIds = (rootState: any) => getQuery(rootState).getResultIDs();

export const getQueryParameters = (rootState: any) => getQuery(rootState).getParameters();
export const getIsQuerying = (rootState: any) => getQuery(rootState).getIsQuerying();

// Memoized selector that receives the state as argument and returns the list of
// Account objects representing the Accounts query results.
export const getQueryResults = createSelector(
  [getAll, getQueryResultIds],
  (accounts: ImmutableAccountMap, ids: ImmutableAccountIDList) => {
    return ids.map((id) => {
      return accounts.get(id)
    });
  }
);

export const getFavouriteAccount = (rootState: any) => stateFrom(rootState).getFavourite();
