// Shared/Combined Actions for the App

import { getInitialData } from '../api-functions';
import { retrieveQuestions } from '../actions/questions';
import { retrieveUsers } from '../actions/users';

export function handleInitialData() {
  return dispatch => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(retrieveQuestions(questions));
      dispatch(retrieveUsers(users));
    });
  };
}