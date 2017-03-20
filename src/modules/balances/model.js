// @flow
import * as I from 'immutable';

// If flow complains about the type, then someone is calling the class with an
// object having a different structure than that of the type. In other words, the problem is elsewhere!
export type Balance = {|
  id: number,
  account: string,
  accountName: string,
  currency: string,
  amount: number,
  date: number
|};

export class ImmutableBalance extends I.Record({
  id: 0,
  account: '',
  accountName: '',
  currency: '',
  amount: 0,
  date: 0
}) {
  id: number;
  account: string;
  accountName: string;
  currency: string;
  amount: number;
  date: number;

  getId(): number { return this.get('id'); }
  setId(id: number): this { return this.set('id', id); }

  getAccount(): string { return this.get('account'); }
  setAccount(account: string): this { return this.set('account', account); }

  getAccountName(): string { return this.get('accountName'); }
  setAccountName(accountName: string): this { return this.set('accountName', accountName); }

  getCurrency(): string { return this.get('currency'); }
  setCurrency(currency: string): this { return this.set('currency', currency); }

  getAmount(): number { return this.get('amount'); }
  setAmount(amount: number): this { return this.set('amount', amount); }

  getDate(): number { return this.get('date'); }
  setDate(date: number): this { return this.set('date', date); }
};

export type ImmutableBalanceMap = I.Map<number, ImmutableBalance>;

export type QueryParameters = {|
  account?: ?string,
  dateFrom?: ?number,
  dateTo?: ?number
|};

export class ImmutableQueryParameters extends I.Record({
  account: null,
  dateFrom: null,
  dateTo: null
}) {
  account: ?string;
  dateFrom: ?number;
  dateTo: ?number;

  getAccount(): ?string { return this.get('account'); }
  setAccount(account: ?string): this { return this.set('account', account); }

  getDateFrom(): ?number { return this.get('dateFrom'); }
  setDateFrom(dateFrom: ?number): this { return this.set('dateFrom', dateFrom); }

  getDateTo(): ?number { return this.get('dateTo'); }
  setDateTo(dateTo: ?number): this { return this.set('dateTo', dateTo); }
};

export type ImmutableBalanceIDList = I.List<number>;

export type Query = {|
  parameters: ImmutableQueryParameters,
  isQuerying: boolean,
  resultIDs: ImmutableBalanceIDList
|};

export class ImmutableQuery extends I.Record({
  parameters: new ImmutableQueryParameters(),
  isQuerying: false,
  resultIDs: I.List()
}) {
  parameters: ImmutableQueryParameters;
  isQuerying: boolean;
  resultIds: ImmutableBalanceIDList;

  getParameters(): ImmutableQueryParameters { return this.get('parameters'); }
  setParameters(parameters: ImmutableQueryParameters): this { return this.set('parameters', parameters); }
  updateParameters(updater: (value: ImmutableQueryParameters) => ImmutableQueryParameters) {
    return this.update('parameters', updater);
  }

  getIsQuerying(): boolean { return this.get('isQuerying'); }
  setIsQuerying(isQuerying: boolean): this { return this.set('isQuerying', isQuerying); }

  getResultIDs(): ImmutableBalanceIDList { return this.get('resultIDs'); }
  setResultIDs(resultIDs: ImmutableBalanceIDList): this { return this.set('resultIDs', resultIDs); }
};

export class ImmutableState extends I.Record({
  entities: I.Map(),
  query: new ImmutableQuery(),
  charts: new ImmutableQuery(),
}) {
  entities: ImmutableBalanceMap;
  query: ImmutableQuery;
  charts: ImmutableQuery;

  getEntities(): ImmutableBalanceMap { return this.get('entities'); }
  setEntities(entities: ImmutableBalanceMap): this { return this.set('entities', entities); }

  getQuery(): ImmutableQuery { return this.get('query'); }
  setQuery(query: ImmutableQuery): this { return this.set('query', query); }

  getCharts(): ImmutableQuery { return this.get('charts'); }
  setCharts(charts: ImmutableQuery): this { return this.set('charts', charts); }
};
