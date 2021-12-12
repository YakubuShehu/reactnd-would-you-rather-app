// Actions for User Authentication

export const SET_LOGGED_IN_USER = 'SET_LOGGED_IN_USER';

export function setLoggedInUser( id ) {
  return {
    type: SET_LOGGED_IN_USER,
    id
  };
}
