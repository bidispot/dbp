// @flow
import React from 'react';
import { injectIntl } from 'react-intl';
import PageHeader from '../../../components/library/PageHeader';
import Query from './AccountsQueryView';
import List from './AccountsListView';
import appMsg, { Keys as AppKeys } from '../../../i18n/keys';
import type { PropsWithIntl } from '../../../types';

export const AccountsPage = (props: PropsWithIntl<{}>) => {
  return (
    <div className="page-wrapper content">
      <PageHeader title={props.intl.formatMessage(appMsg(AppKeys.PAGES_ACCOUNTS))} headerIcon="user" rootText={props.intl.formatMessage(appMsg(AppKeys.APP_TITLE))} />
      <Query />
      <List />
    </div>
  );
};

export default injectIntl(AccountsPage);
