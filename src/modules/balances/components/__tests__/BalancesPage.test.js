import React from 'react';
import { shallow } from 'enzyme';
import BalancesPage from '../BalancesPage';

describe('balances', () => {
  describe('components', () => {
    describe('page', () => {
      // simple smoke test
      it('shallow renders without crashing', () => {
        shallow(<BalancesPage />);
      });
    });
  });
});
