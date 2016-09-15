import { createSelector } from 'reselect';

const getCashBalances = (state) => state.database.get('balances');

const getCashBalanceResultIds = (state) => state.balances.queryResults;

// Memoized selector that receives the state as argument and returns the list of
// Balance objects representing the Cash Balances query results.
export const getCashBalancesQueryResults = createSelector(
  [getCashBalances, getCashBalanceResultIds],
  (balances, ids) => {
    return ids.map((id) => balances.get(id))
  }
);
