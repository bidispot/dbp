// @flow
import { messageFunctionBuilder } from '../../../i18n';

export const Keys = {
  QUERY_PARAMS_ACCOUNT_LABEL: 'accounts.query.params.account.label',
  QUERY_PARAMS_ACCOUNT_PLACEHOLDER: 'accounts.query.params.account.placeholder',
  QUERY_PARAMS_ACCOUNTNAME_LABEL: 'accounts.query.params.accountname.label',
  QUERY_PARAMS_ACCOUNTNAME_PLACEHOLDER: 'accounts.query.params.accountname.placeholder',
  QUERY_PARAMS_CURRENCY_LABEL: 'accounts.query.params.currency.label',
}

const _keys = {
  [Keys.QUERY_PARAMS_ACCOUNT_LABEL]: { defaultMessage: 'Account' },
  [Keys.QUERY_PARAMS_ACCOUNT_PLACEHOLDER]: { defaultMessage: 'Account: e.g. 12345' },
  [Keys.QUERY_PARAMS_ACCOUNTNAME_LABEL]: { defaultMessage: 'Account name' },
  [Keys.QUERY_PARAMS_ACCOUNTNAME_PLACEHOLDER]: { defaultMessage: 'Account name: e.g. UBS' },
  [Keys.QUERY_PARAMS_CURRENCY_LABEL]: { defaultMessage: 'Currency' },
};

// For imperative internationalisation
export default messageFunctionBuilder(_keys);
