import { combineReducers } from 'redux';
import authorizedUser from './user-auth';
import questions from './questions';
import users from './users';

export default combineReducers({
  authorizedUser,
  questions,
  users
});