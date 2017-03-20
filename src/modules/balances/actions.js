// @flow
import { BALANCES_URL } from './constants';
import * as t from './actionTypes';
import errors from '../errors';
import { Schemas, NormalizedSuccessfulResponse, NormalizedFailedResponse } from '../../normalizer';
import * as apiMiddleware from '../../middleware/api/';
import type { Balance, QueryParameters } from './model';
import type { Thunk } from '../../types';

export type Action =
  {| type: t.QueryActionType, parameters: QueryParameters |}
  | {| type: t.QuerySuccessActionType, response: NormalizedSuccessfulResponse<*, *, Balance, number> |}
  | {| type: t.QueryFailureActionType, response: NormalizedFailedResponse |}
  | {| type: t.QueryChartsActionType, parameters: QueryParameters |}
  | {| type: t.QueryChartsSuccessActionType, response: NormalizedSuccessfulResponse<*, *, Balance, number> |}
  | {| type: t.QueryChartsFailureActionType, response: NormalizedFailedResponse |}
  ;

export const types = t;

function q(params: QueryParameters, actionTypes: Array<string>): Thunk<Action> {
  return dispatch => {
    dispatch(errors.actions.resetMessage());

    return dispatch(apiMiddleware.createAction({
      actionTypes: actionTypes,
      endpoint: BALANCES_URL,
      parameters: params,
      schema: Schemas.BALANCE_ARRAY
    }));
  };
};

export function query(params: QueryParameters): Thunk<Action> {
  return q(params, [t.QUERY, t.QUERY_SUCCESS, t.QUERY_FAILURE]);
};

export function queryCharts(params: QueryParameters): Thunk<Action> {
  return q(params, [t.QUERY_CHARTS, t.QUERY_CHARTS_SUCCESS, t.QUERY_CHARTS_FAILURE]);
};
