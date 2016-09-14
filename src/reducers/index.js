import { combineReducers } from 'redux';
import EntitiesReducer from './reducer_entities';
import BalancesReducer from './reducer_balances';
import ErrorsReducer from './reducer_errors';

const rootReducer = combineReducers({
  database: EntitiesReducer,
  balances: BalancesReducer,
  errors: ErrorsReducer
});

export default rootReducer;
