import { Record, List } from 'immutable';
import { RefDataQuery } from './model';
import { QUERY_T7, QUERY_T7_SUCCESS } from '../actions/index';

const StateRecord = new Record({
  queryResults: new List(),
  queryParameters: new RefDataQuery(),
});

class State extends StateRecord {
}

const INITIAL_STATE = new State();

export default (state = INITIAL_STATE, action) => {
  const { parameters } = action;

  switch (action.type) {
    case QUERY_T7:
      return state
        .update('queryParameters', (queryParameters) =>
          queryParameters
            .set('product', parameters.product)
            .set('type', parameters.type));
    case QUERY_T7_SUCCESS:
      const { response } = action;
      if (response) {
        const result = response.result || [];

        // New query results
        const queryResults = new List(result);
        return state
          .set('isQuerying', false)
          .set('queryResults', queryResults);
      } else {
        return state;
      }

    default:
      return state;
  }
}
