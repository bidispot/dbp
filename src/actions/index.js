import { Schemas } from '../middleware/schema';
import { API_CALL_INFO } from '../middleware/api';

export const QUERY_BALANCES = 'QUERY_BALANCES';
export const QUERY_BALANCES_SUCCESS = 'QUERY_BALANCES_SUCCESS';
export const QUERY_BALANCES_FAILURE = 'QUERY_BALANCES_FAILURE';
export const RESET_ERRORS = "RESET_ERRORS";

const BALANCES_URL = 'balances/query';

/**
 * Runs a query against cash balances
 * @param  {object} params  The query string parameters in form of a JSON object.
 *                          Supported properties: [account string, dateFrom number, dateTo number]
 * @return {object}         The action created for a query on cash balances
 */
export function queryBalances(params) {
  return dispatch => {
    dispatch(resetErrors());

    dispatch({
      [API_CALL_INFO]: {
        actionTypes: [QUERY_BALANCES, QUERY_BALANCES_SUCCESS, QUERY_BALANCES_FAILURE],
        endpoint: BALANCES_URL,
        parameters: params,
        schema: Schemas.BALANCE_ARRAY
      }
    });
  }
}

export function resetErrors() {
  return {
    type: RESET_ERRORS
  }
}
