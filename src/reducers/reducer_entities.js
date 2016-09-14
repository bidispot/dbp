import { Map } from 'immutable';
import { Balance, BalanceMap } from './model';

const INITIAL_STATE = new Map({
  balances: new BalanceMap()
});

export default (state = INITIAL_STATE, action) => {
  if (action.response && action.response.entities) {
    // Entities are normalized --> convert them to ImmutableJS structures
    const { balances: balanceEntities } = action.response.entities || [];
    const balanceRecords = Object.keys(balanceEntities).map(key => new Balance(balanceEntities[key]));
    const records = new Map({ balances: balanceRecords });

    // Merge them to the current state
    return state.merge(records);
  }

  return state;
}
