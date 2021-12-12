// Reducer function for users component

import { RETRIEVE_USERS, SAVE_ANSWER_TO_USER, ADD_QUESTION_TO_USER } from '../actions/users';

export default function users(state = {}, action) {

  switch (action.type) {
    case RETRIEVE_USERS:
      return {
        ...state,
        ...action.users
      };

    case SAVE_ANSWER_TO_USER:
      const { authorizedUser, questionID, answer } = action;

      return {
        ...state,
        [authorizedUser]: {
          ...state[authorizedUser],
          answers: {
            ...state[authorizedUser].answers,
            [questionID]: answer
          }
        }
      };

      case ADD_QUESTION_TO_USER:
      const { id, author } = action;

      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat(id)
        }
      };
    default:
      return state;
  }

}