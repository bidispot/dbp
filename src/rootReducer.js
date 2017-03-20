// @flow
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import errors from './modules/errors';
import accounts from './modules/accounts';
import balances from './modules/balances';
import welcome from './modules/welcome';
import i18n from './modules/i18n';

const rootReducer = combineReducers({
  [errors.constants.NAME]: errors.reducer,
  [welcome.constants.NAME]: welcome.reducer,
  [accounts.constants.NAME]: accounts.reducer,
  [balances.constants.NAME]: balances.reducer,
  [i18n.constants.NAME]: i18n.reducer,
  form: formReducer
});

export default rootReducer;
