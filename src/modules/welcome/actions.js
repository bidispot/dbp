// @flow
import * as apiMiddleware from '../../middleware/api/';
import { RequestType } from '../../middleware/api/model';
import errors from '../errors';

export const AUTHORIZE_REQUEST = 'AUTHORIZE_REQUEST';
export const AUTHORIZE_SUCCESS = 'AUTHORIZE_SUCCESS';
export const AUTHORIZE_ERROR = 'AUTHORIZE_ERROR';

const DBP_CLIENT_ID = process.env.DBP_CLIENT_ID || 'dbp';
let DBP_REDIRECT_URI;
if (process.env.NODE_ENV === 'production') {
  DBP_REDIRECT_URI = process.env.DBP_REDIRECT_URI || 'https://dbp-demo-app.herokuapp.com';
} else {
  DBP_REDIRECT_URI = process.env.DBP_REDIRECT_URI || 'http://localhost:3000/auth';
}
const DBP_RESPONSE_TYPE = process.env.DBP_RESPONSE_TYPE || 'token';
const HYDRA_URL = process.env.HYDRA_URL || `http://localhost:4444/oauth2/auth?client_id=${DBP_CLIENT_ID}&redirect_uri=${DBP_REDIRECT_URI}&response_type=${DBP_RESPONSE_TYPE}&scope=accounts+balances&state=qomfpbmojbrttwzwzmbisukl&nonce=orgzqsnouipeoftobohumdwh`;

// =================
// Authorization
// =================
export function authorizeRequest(params) {
  return {
    type: AUTHORIZE_REQUEST,
    params
  };
}

export function authorizeError(params) {
  return {
    type: AUTHORIZE_ERROR,
    params
  };
}

export function authorizeSuccess(response) {
  return dispatch => {
    dispatch({
      type: AUTHORIZE_SUCCESS,
      response
    });
  };
}

export function authorize() {
  return dispatch => {
    dispatch(errors.actions.resetMessage());

    return dispatch(apiMiddleware.createAction({
      endpoint: HYDRA_URL,
      actionTypes: [AUTHORIZE_REQUEST],
      parameters: null,
      httpRequestType: RequestType.REDIRECT
    }));
  };
};
