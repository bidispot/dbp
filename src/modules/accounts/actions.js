// @flow
import { ACCOUNTS_URL } from './constants';
import * as t from './actionTypes';
import errors from '../errors';
import balances from '../balances';
import { Schemas, NormalizedSuccessfulResponse, NormalizedFailedResponse } from '../../normalizer';
import * as apiMiddleware from '../../middleware/api/';
import type { Account, QueryParameters } from './model.js';
import type { Thunk } from '../../types';

export type Action =
  {| type: t.QueryActionType, parameters: QueryParameters |}
  | {| type: t.QuerySuccessActionType, response: NormalizedSuccessfulResponse<Account, string, *, *> |}
  | {| type: t.QueryFailureActionType, response: NormalizedFailedResponse |}
  | {| type: t.SelectFavoriteActionType, account: ?Account |}
  ;

export const types = t;

function _selectAccount(account: ?Account): Action {
  return {
    type: t.SELECT_FAVORITE,
    account
  };
};

export function query(params: QueryParameters): Thunk<Action> {
  return dispatch => {
    dispatch(errors.actions.resetMessage());

    return dispatch(apiMiddleware.createAction({
      actionTypes: [t.QUERY, t.QUERY_SUCCESS, t.QUERY_FAILURE],
      endpoint: ACCOUNTS_URL,
      parameters: params,
      schema: Schemas.ACCOUNT_ARRAY
    }));
  };
};

export function selectFavouriteAccount(account: ?Account): Thunk<Action> {
  return dispatch => {
    dispatch(errors.actions.resetMessage());
    const ret = dispatch(_selectAccount(account));

    if (account != null) {
      return dispatch(balances.actions.queryCharts({account: account.account}));
    } else {
      return ret;
    }
  };
};
