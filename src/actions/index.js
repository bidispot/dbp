import axios from 'axios';
import _ from 'lodash';

export const FETCH_BALANCES = 'FETCH_BALANCES';
export const FETCH_BALANCE = 'FETCH_BALANCE';
export const QUERY_BALANCES = 'QUERY_BALANCES';
export const FETCH_OUTSTANDING_AMOUNT = 'FETCH_OUTSTANDING_AMOUNT';
export const FETCH_COUNT_UNDERCOLL_CONTRACTS = 'FETCH_COUNT_UNDERCOLL_CONTRACTS';
export const QUERY_COUNT_UNMATCHED_INX = 'QUERY_COUNT_UNMATCHED_INX';
export const FETCH_ACCOUNTS = 'FETCH_ACCOUNTS';
export const FETCH_ACCOUNT = 'FETCH_ACCOUNT';
export const QUERY_ACCOUNTS = 'QUERY_ACCOUNTS';

const ROOT_URL = 'http://dbp.apiary.com';
const BALANCES_URL = `${ROOT_URL}/balances`;
const GSF_URL = `${ROOT_URL}/gsf`;
const SETTLEMENT_URL = `${ROOT_URL}/settlement`;
const ACCOUNTS_URL = `${ROOT_URL}/accounts`;

/**
 * Removes (sub-)properties with null or undefined values from a given JSON object
 * @param  {object} jsonObject  A JSON object with some potentially null or underfined (sub-)properties
 * @return {object}             A new JSON object where (sub-)properties with undefined or null values have been
 *                                removed.
 */
function filterNil(jsonObject) {
  return _.omitBy(jsonObject, _.isNil);
}

/**
 * Runs an HTTP GET request
 * @param  {string} url     The URL to send the request to
 * @param  {object} params  Optional JSON object representing the query string parameters
 * @return {Promise}        The promise backing the network request
 */
function runGet(url, params = null) {
  const queryParams = filterNil(params);

  if (params === null) {
    return axios.get(url);
  } else {
    return axios.get(url, { 
      params: queryParams 
    });
  }
}

/**
 * Fetches all cash balances
 * @return {object} The action created for fetching all cash balances
 */
export function fetchBalances() {
  const request = runGet(BALANCES_URL);

  return {
    type: FETCH_BALANCES,
    payload: request
  };
}

/**
 * Fetches a specific cash balance by its identifier
 * @param  {string} id  The balance identifier
 * @return {object}     The action created for fetching a cash balance
 */
export function fetchBalance(id) {
  const request = runGet(`${BALANCES_URL}/${id}`);

  return {
    type: FETCH_BALANCE,
    payload: request
  };
}

/**
 * Runs a query against cash balances
 * @param  {object} params  The query string parameters in form of a JSON object. 
 *                          Supported properties: [account string, dateFrom number, dateTo number]
 * @return {object}         The action created for a query on cash balances
 */
export function queryBalances(params) {
  const request = runGet(`${BALANCES_URL}`, params);

  return {
    type: QUERY_BALANCES,
    payload: request
  };
}

/**
 * Fetches the total outstanding amount in terms of collateral
 * @return {object} The action created for fetching the outstanding amount
 */
export function fetchOutstandingAmount() {
  const request = runGet(`${GSF_URL}/outstandingAmount`);

  return {
    type: FETCH_OUTSTANDING_AMOUNT,
    payload: request
  };
}

/**
 * Fetches the number of undercollateralized contracts
 * @return {object} The action created for fetching the number of undercollateralized contracts
 */
export function fetchCountUndercollContracts() {
  const request = runGet(`${GSF_URL}/undercollContracts`);

  return {
    type: FETCH_COUNT_UNDERCOLL_CONTRACTS,
    payload: request
  };
}

/**
 * Runs a query for counting the unmatched instructions before market deadline
 * @param  {object} params  The query string parameters in form of a JSON object.
 *                          Supported properties: [currency string]
 * @return {object}         The action created for a counting query on unmatched inx
 */
export function queryCountUnmatchedInx(params) {
  const request = runGet(`${SETTLEMENT_URL}/unmatchedInx`, params);

  return {
    type: QUERY_COUNT_UNMATCHED_INX,
    payload: request
  };
}

/**
 * Fetches all accounts
 * @return {object} The action created for fetching all accounts
 */
export function fetchAccounts() {
  const request = runGet(ACCOUNTS_URL);

  return {
    type: FETCH_ACCOUNTS,
    payload: request
  };
}

/**
 * Fetches a specific account by its identifier
 * @param  {string} id  The account identifier
 * @return {object}     The action created for fetching an account
 */
export function fetchAccount(id) {
  const request = runGet(`${ACCOUNTS_URL}/${id}`);

  return {
    type: FETCH_ACCOUNT,
    payload: request
  };
}

/**
 * Runs a query against accounts
 * @param  {object} params  The query string parameters in form of a JSON object.
 *                          Supported properties: [name string, country string, currency string]
 * @return {object}         The action created for a query on accounts
 */
export function queryAccounts(params) {
  const request = runGet(`${ACCOUNTS_URL}`, params);

  return {
    type: QUERY_ACCOUNTS,
    payload: request
  };
}
