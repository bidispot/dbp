// @flow
import * as I from 'immutable';
import * as t from './actionTypes';
import * as model from './model';
import type { Action } from './actions';

const INITIAL_STATE = new model.ImmutableState({
  entities: (I.Map(): model.ImmutableAccountMap),
  query: new model.ImmutableQuery(),
  favourite: null
});

const getMergedEntitiesState = (existingEntities: model.ImmutableAccountMap, newEntities: ?{[_: string]: model.Account}): model.ImmutableAccountMap => {
  const incomingEntities = newEntities;
  if (incomingEntities != null) {
    // Entities are normalized --> convert them to ImmutableJS structures
    const accountKeys = Object.keys(incomingEntities);

    const alternatingKeyValueArray = accountKeys.map(key =>
      [incomingEntities[key].id, new model.ImmutableAccount(incomingEntities[key])]
    );

    const immutableAccounts: I.Map<string, model.ImmutableAccount> = I.Map(alternatingKeyValueArray);
    return existingEntities.mergeDeep(immutableAccounts);
  } else {
    return existingEntities;
  }
};

export default (state = INITIAL_STATE, action: Action): model.ImmutableState => {
  switch (action.type) {
    case t.QUERY:
      const parameters = action.parameters;
      return state.setQuery(
        state.getQuery()
          .setIsQuerying(true)
          .updateParameters(queryParameters =>
            queryParameters
              .setAccount(parameters.account)
              .setName(parameters.name)
              .setCurrency(parameters.currency))
      );
    case t.QUERY_SUCCESS:
      const response = action.response;
      if (response) {
        const result = response.result || [];

        // New query results (we don't even care if they could be the same as before)
        const queryResults = I.List(result);
        const queryState = state.getQuery()
          .setIsQuerying(false)
          .setResultIDs(queryResults);

        // Deal with entities
        const entitiesState = getMergedEntitiesState(state.getEntities(), response.entities.accounts);

        return state
          .setQuery(queryState)
          .setEntities(entitiesState);
      } else {
        return state;
      }
    case t.QUERY_FAILURE:
      return state.setQuery(
        state.getQuery().setIsQuerying(false)
      );
    case t.SELECT_FAVORITE:
      const favAcct = action.account;

      if (favAcct != null) {
        return state.setFavourite(new model.ImmutableAccount(favAcct));
      } else {
        return state.setFavourite(null);
      }
    default:
      return state;
  }
};
