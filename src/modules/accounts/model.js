// @flow
import * as I from 'immutable';

// If flow complains about the type, then someone is calling the class with an
// object having a different structure than that of the type. In other words, the problem is elsewhere!
export type Account = {|
  id: string,
  account: string,
  name: string,
  currency: string,
  address: string,
  country: string
|};

export class ImmutableAccount extends I.Record({
  id: '',
  account: '',
  name: '',
  currency: '',
  address: '',
  country: ''
}) {
  id: string;
  account: string;
  name: string;
  currency: string;
  address: string;
  country: string;

  getId(): string { return this.get('id'); }
  setId(id: string): this { return this.set('id', id); }

  getAccount(): string { return this.get('account'); }
  setAccount(account: string): this { return this.set('account', account); }

  getName(): string { return this.get('name'); }
  setName(name: string): this { return this.set('name', name); }

  getCurrency(): string { return this.get('currency'); }
  setCurrency(currency: string): this { return this.set('currency', currency); }

  getAddress(): string { return this.get('address'); }
  setAddress(address: string): this { return this.set('address', address); }

  getCountry(): string { return this.get('country'); }
  setCountry(country: string): this { return this.set('country', country); }
};

export type ImmutableAccountMap = I.Map<string, ImmutableAccount>;

export type QueryParameters = {|
  account?: ?string,
  name?: ?string,
  currency?: ?string
|};

export class ImmutableQueryParameters extends I.Record({
  account: null,
  name: null,
  currency: null
}) {
  account: ?string;
  name: ?string;
  currency: ?string;

  getAccount(): ?string { return this.get('account'); }
  setAccount(account: ?string): this { return this.set('account', account); }

  getName(): ?string { return this.get('name'); }
  setName(name: ?string): this { return this.set('name', name); }

  getCurrency(): ?string { return this.get('currency'); }
  setCurrency(currency: ?string): this { return this.set('currency', currency); }
};

export type ImmutableAccountIDList = I.List<string>;

export type Query = {|
  parameters: ImmutableQueryParameters,
  isQuerying: boolean,
  resultIDs: ImmutableAccountIDList
|};

export class ImmutableQuery extends I.Record({
  parameters: new ImmutableQueryParameters(),
  isQuerying: false,
  resultIDs: I.List()
}) {
  parameters: ImmutableQueryParameters;
  isQuerying: boolean;
  resultIDs: ImmutableAccountIDList;

  getParameters(): ImmutableQueryParameters { return this.get('parameters'); }
  setParameters(parameters: ImmutableQueryParameters): this { return this.set('parameters', parameters); }
  updateParameters(updater: (value: ImmutableQueryParameters) => ImmutableQueryParameters) {
    return this.update('parameters', updater);
  }

  getIsQuerying(): boolean { return this.get('isQuerying'); }
  setIsQuerying(isQuerying: boolean): this { return this.set('isQuerying', isQuerying); }

  getResultIDs(): ImmutableAccountIDList { return this.get('resultIDs'); }
  setResultIDs(resultIDs: ImmutableAccountIDList): this { return this.set('resultIDs', resultIDs); }
};

export class ImmutableState extends I.Record({
  entities: I.Map(),
  query: new ImmutableQuery(),
  favourite: null
}) {
  entities: ImmutableAccountMap;
  query: ImmutableQuery;
  favourite: ?ImmutableAccount;

  getEntities(): ImmutableAccountMap { return this.get('entities'); }
  setEntities(entities: ImmutableAccountMap): this { return this.set('entities', entities); }

  getQuery(): ImmutableQuery { return this.get('query'); }
  setQuery(query: ImmutableQuery): this { return this.set('query', query); }

  getFavourite(): ?ImmutableAccount { return this.get('favourite'); }
  setFavourite(favourite: ?ImmutableAccount): this { return this.set('favourite', favourite); }
};
