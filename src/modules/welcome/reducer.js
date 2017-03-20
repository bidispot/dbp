import { Record } from 'immutable';
import { AUTHORIZE_REQUEST, AUTHORIZE_SUCCESS, AUTHORIZE_ERROR } from './actions';

/**********************
 * State
 **********************/
const StateRecord = new Record({
  is_processing: false,
  is_authorized: false,
  access_token: null,
  expires_in: null,
  error: null
});

class State extends StateRecord {
}

const INITIAL_STATE = new State();

export default function (state = INITIAL_STATE, action) {
  console.log('Reducing: ', action, " state: ", state);
  switch (action.type) {
    case AUTHORIZE_REQUEST:
      return state
        .set('is_processing', true)
        .set('error', null);
    case AUTHORIZE_SUCCESS:
      console.log("Authorize success call", action);
      const { response } = action;
      return state
        .set('is_processing', false)
        .set('is_authorized', true)
        .set('access_token', response.access_token)
        .set('expires_in', response.expires_in)
        .set('error', null);
    case AUTHORIZE_ERROR:
      const { errorMessage } = action;
      return state
        .set('is_processing', false)
        .set('is_authorized', false)
        .set('error', errorMessage.error);
    default:
      return state;
  }
}
