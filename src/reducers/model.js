import { Record, Map } from 'immutable';

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

const ErrorRecord = new Record({
  message: ''
});

class AppError extends ErrorRecord {
}

export { Balance, BalanceMap, BalanceQuery, AppError };
