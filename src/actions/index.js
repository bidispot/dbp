import { Schemas } from '../middleware/schema';
import { API_CALL_INFO } from '../middleware/api';

export const QUERY_BALANCES = 'QUERY_BALANCES';
export const QUERY_BALANCES_SUCCESS = 'QUERY_BALANCES_SUCCESS';
export const QUERY_BALANCES_FAILURE = 'QUERY_BALANCES_FAILURE';
export const QUERY_ACCOUNTS = 'QUERY_ACCOUNTS';
export const QUERY_ACCOUNTS_SUCCESS = 'QUERY_ACCOUNTS_SUCCESS';
export const QUERY_ACCOUNTS_FAILURE = 'QUERY_ACCOUNTS_FAILURE';
export const RESET_ERRORS = "RESET_ERRORS";

const BALANCES_URL = 'balances/query';
const ACCOUNTS_URL = 'accounts/query';

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

/**
 * Runs a query against accounts
 * @param  {object} params  The query string parameters in form of a JSON object.
 *                          Supported properties: [account string, name string, currency string]
 * @return {object}         The action created for a query on accounts
 */
export function queryAccounts(params) {
  return dispatch => {
    // dispatch(resetErrors());

    dispatch({
      [API_CALL_INFO]: {
        actionTypes: [QUERY_ACCOUNTS, QUERY_ACCOUNTS_SUCCESS, QUERY_ACCOUNTS_FAILURE],
        endpoint: ACCOUNTS_URL,
        parameters: params,
        schema: Schemas.ACCOUNT_ARRAY
      }
    });
  }
}

export function resetErrors() {
  return {
    type: RESET_ERRORS
  }
}
