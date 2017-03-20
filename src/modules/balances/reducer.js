// @flow
import * as I from 'immutable';
import * as t from './actionTypes';
import * as model from './model';
import type { Action } from './actions';

const INITIAL_STATE = new model.ImmutableState();

const getMergedEntitiesState = (existingEntities: model.ImmutableBalanceMap, newEntities: ?{ [_: number]: model.Balance }): model.ImmutableBalanceMap => {
  const incomingEntities = newEntities;
  if (incomingEntities != null) {
    // Entities are normalized --> convert them to ImmutableJS structures
    const balanceKeys = Object.keys(incomingEntities).map(key => Number(key));
    const alternatingKeyValueArray = balanceKeys.map(key =>
      [incomingEntities[key].id, new model.ImmutableBalance(incomingEntities[key])]
    );
    const immutableBalances: I.Map<number, model.ImmutableBalance> = I.Map(alternatingKeyValueArray);

    return existingEntities.mergeDeep(immutableBalances);
  } else {
    return existingEntities;
  }
};

export default (state = INITIAL_STATE, action: Action): model.ImmutableState => {
  switch (action.type) {
    case t.QUERY:
      const qActionParams = action.parameters;

      return state.setQuery(
        state.getQuery()
          .setIsQuerying(true)
          .updateParameters(queryParameters =>
            queryParameters
              .setAccount(qActionParams.account)
              .setDateFrom(qActionParams.dateFrom)
              .setDateTo(qActionParams.dateTo))
      );
    case t.QUERY_SUCCESS:
      const qResponse = action.response;
      if (qResponse) {
        const result = qResponse.result || [];

        // New query results (we don't even care if they could be the same as before)
        const queryResults = I.List(result);
        const updatedQuery = state.getQuery()
          .setIsQuerying(false)
          .setResultIDs(queryResults);

        // Deal with entities
        const entitiesState = getMergedEntitiesState(state.getEntities(), qResponse.entities.balances);

        return state.setQuery(updatedQuery).setEntities(entitiesState);
      } else {
        return state;
      }
    case t.QUERY_CHARTS:
      const qcActionParams = action.parameters;

      return state.setCharts(
        state.getCharts()
          .setIsQuerying(true)
          .updateParameters(queryParameters =>
            queryParameters
              .setAccount(qcActionParams.account)
              .setDateFrom(qcActionParams.dateFrom)
              .setDateTo(qcActionParams.dateTo))
      );
    case t.QUERY_FAILURE:
      return state.setQuery(
        state.getQuery().setIsQuerying(false)
      );
    case t.QUERY_CHARTS_SUCCESS:
      const qcResponse = action.response;
      if (qcResponse) {
        const result = qcResponse.result || [];

        // New query results (we don't even care if they could be the same as before)
        const queryResults = I.List(result);
        const updatedCharts = state.getCharts()
          .setIsQuerying(false)
          .setResultIDs(queryResults);

        // Deal with entities
        const entitiesState = getMergedEntitiesState(state.getEntities(), qcResponse.entities.balances);

        return state.setCharts(updatedCharts).setEntities(entitiesState);
      } else {
        return state;
      }
    case t.QUERY_CHARTS_FAILURE:
      return state.setCharts(
        state.getCharts().setIsQuerying(false)
      );
    default:
      return state;
  }
};
