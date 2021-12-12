// Reducer function for questions component

import { RETRIEVE_QUESTIONS, SAVE_ANSWER_TO_QUESTION, ADD_QUESTION } from '../actions/questions';

export default function questions(state = {}, action) {

  switch (action.type) {

    case RETRIEVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      };

    case SAVE_ANSWER_TO_QUESTION:
      const { authorizedUser, questionID, answer } = action;

      return {
        ...state,
        [questionID]: {
          ...state[questionID],
          [answer]: {
            ...state[questionID][answer],
            votes: state[questionID][answer].votes.concat(authorizedUser)
          }
        }
      };

    case ADD_QUESTION:
      const { question } = action;

      return {
        ...state,
        [question.id]: question
      };

    default:
      return state;

  }
}