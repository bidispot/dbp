import React from 'react';
import { shallowWithIntl } from '../../../../__dev__/test_intl';
import { AccountsPage } from '../AccountsPage';

describe('accounts', () => {
  describe('components', () => {
    describe('page', () => {
      // simple smoke test
      it('shallow renders without crashing', () => {
        shallowWithIntl(<AccountsPage />);
      });
    });
  });
});
