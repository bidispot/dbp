import { Map } from 'immutable';
import { Balance, BalanceMap } from './model';

const INITIAL_STATE = new Map({
  balances: new BalanceMap()
});

export default (state = INITIAL_STATE, action) => {
  if (action.response && action.response.entities) {
    // Entities are normalized --> convert them to ImmutableJS structures
    const { balances: balanceEntities } = action.response.entities || [];
    const keys = Object.keys(balanceEntities || []);
    const balanceRecords = new BalanceMap(keys.map(key =>
      [balanceEntities[key].id, new Balance(balanceEntities[key])]
      // super-important to use balanceEntities[key].id instead of key for the first
      // element because key is of type string due to Object.keys (and we want a number maybe)
    ));

    const records = new Map({ balances: balanceRecords });

    // Merge them to the current state
    return state.mergeDeep(records);
  }

  return state;
}
