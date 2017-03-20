// @flow
export const QUERY: 'accounts/QUERY' = 'accounts/QUERY';
export const QUERY_SUCCESS: 'accounts/QUERY_SUCCESS' = 'accounts/QUERY_SUCCESS';
export const QUERY_FAILURE: 'accounts/QUERY_FAILURE' = 'accounts/QUERY_FAILURE';
export const SELECT_FAVORITE: 'accounts/SELECT_FAVORITE' = 'accounts/SELECT_FAVORITE';

export type QueryActionType = typeof QUERY;
export type QuerySuccessActionType = typeof QUERY_SUCCESS;
export type QueryFailureActionType = typeof QUERY_FAILURE;
export type SelectFavoriteActionType = typeof SELECT_FAVORITE;
