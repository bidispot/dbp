// @flow
export const QUERY: 'balances/QUERY' = 'balances/QUERY';
export const QUERY_SUCCESS: 'balances/QUERY_SUCCESS' = 'balances/QUERY_SUCCESS';
export const QUERY_FAILURE: 'balances/QUERY_FAILURE' = 'balances/QUERY_FAILURE';
export const QUERY_CHARTS: 'balances/charts/QUERY' = 'balances/charts/QUERY';
export const QUERY_CHARTS_SUCCESS: 'balances/charts/QUERY_SUCCESS' = 'balances/charts/QUERY_SUCCESS';
export const QUERY_CHARTS_FAILURE: 'balances/charts/QUERY_FAILURE' = 'balances/charts/QUERY_FAILURE';

export type QueryActionType = typeof QUERY;
export type QuerySuccessActionType = typeof QUERY_SUCCESS;
export type QueryFailureActionType = typeof QUERY_FAILURE;
export type QueryChartsActionType = typeof QUERY_CHARTS;
export type QueryChartsSuccessActionType = typeof QUERY_CHARTS_SUCCESS;
export type QueryChartsFailureActionType = typeof QUERY_CHARTS_FAILURE;
