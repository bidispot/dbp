import { combineReducers } from 'redux';
import EntitiesReducer from './reducer_entities';
import BalancesReducer from './reducer_balances';
import AccountsReducer from './reducer_accounts';
import ChartsReducer from './reducer_charts';
import RefDataReducer from './reducer_refdata';
import ErrorsReducer from './reducer_errors';

const rootReducer = combineReducers({
  database: EntitiesReducer,
  balances: BalancesReducer,
  accounts: AccountsReducer,
  charts: ChartsReducer,
  refdata: RefDataReducer,
  errors: ErrorsReducer
});

export default rootReducer;
