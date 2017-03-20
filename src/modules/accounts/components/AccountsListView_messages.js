// @flow
import { messageFunctionBuilder } from '../../../i18n';

export const Keys = {
  LIST_COLUMNS_ACCOUNT_HEADER: 'accounts.list.columns.account.header',
  LIST_COLUMNS_ACCOUNTNAME_HEADER: 'accounts.list.columns.accountname.header',
  LIST_COLUMNS_CURRENCY_HEADER: 'accounts.list.columns.currency.header',
  LIST_COLUMNS_ADDRESS_HEADER: 'accounts.list.columns.address.header',
  LIST_COLUMNS_COUNTRY_HEADER: 'accounts.list.columns.country.header',
  MESSAGES_SELECTEDFAVOURITEACCOUNT: 'accounts.messages.selectedfavouriteaccount',
  MESSAGES_NEWFAVOURITEACCOUNTSELECTED: 'accounts.messages.newfavouriteaccountselected',
  MESSAGES_CLICKTOSELECTFAVOURITEACCOUNT: 'accounts.messages.clicktoselectfavouriteaccount',
  POPUPS_FAVOURITEACCOUNT_HEADER: 'accounts.popups.favouriteaccount.header'
}

const _keys = {
  [Keys.LIST_COLUMNS_ACCOUNT_HEADER]: { defaultMessage: 'Account' },
  [Keys.LIST_COLUMNS_ACCOUNTNAME_HEADER]: { defaultMessage: 'Name' },
  [Keys.LIST_COLUMNS_CURRENCY_HEADER]: { defaultMessage: 'Currency' },
  [Keys.LIST_COLUMNS_ADDRESS_HEADER]: { defaultMessage: 'Address' },
  [Keys.LIST_COLUMNS_COUNTRY_HEADER]: { defaultMessage: 'Country' },
  [Keys.MESSAGES_SELECTEDFAVOURITEACCOUNT]: { defaultMessage: 'Favourite Account:' },
  [Keys.MESSAGES_NEWFAVOURITEACCOUNTSELECTED]: { defaultMessage: 'Your new favourite account has been selected' },
  [Keys.MESSAGES_CLICKTOSELECTFAVOURITEACCOUNT]: { defaultMessage: 'Click to select your favorite account.' },
  [Keys.POPUPS_FAVOURITEACCOUNT_HEADER]: { defaultMessage: 'Preferences' }
};

// For imperative internationalisation
export default messageFunctionBuilder(_keys);
