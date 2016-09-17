import { Record, Map } from 'immutable';

/**********************
 * Balances
 **********************/
const BalanceRecord = new Record({
  id: null,
  account: '',
  accountName: '',
  currency: '',
  amount: null,
  date: null
});

class Balance extends BalanceRecord {
}

const BalanceMap = Map;

const BalanceQueryRecord = new Record({
  account: null,
  dateFrom: null,
  dateTo: null
});

class BalanceQuery extends BalanceQueryRecord {
}

/**********************
 * Accounts
 **********************/
const AccountRecord = new Record({
  id: '',
  account: '',
  name: '',
  currency: '',
  country: '',
  address: ''
});

class Account extends AccountRecord{
}

const AccountMap = Map;

const AccountQueryRecord = new Record({
  account: null,
  name: null,
  currency: null
})

class AccountQuery extends AccountQueryRecord {
}

/**********************
 * General
 **********************/
const ErrorRecord = new Record({
  message: ''
});

class AppError extends ErrorRecord {
}

/**********************
 * Exports
 **********************/
export { Balance, BalanceMap, BalanceQuery, Account, AccountMap, AccountQuery, AppError };
