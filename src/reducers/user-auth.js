// Reducer function for user authorization component

import { SET_LOGGED_IN_USER } from '../actions/user-auth';

export default function authorizedUser(state = null, action) {
  if (action.type === SET_LOGGED_IN_USER) {
    return action.id;
  }
  return state;
}