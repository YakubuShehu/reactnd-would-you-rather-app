// Actions for User Retrieval
import { saveQuestionAnswer } from '../api-functions';
import { saveAnswerToQuestion } from '../actions/questions';

export const RETRIEVE_USERS = 'RETRIEVE_USERS';
export const SAVE_ANSWER_TO_USER = 'SAVE_ANSWER_TO_USER';
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER';


export function retrieveUsers( users ) {
  return {
    type: RETRIEVE_USERS,
    users
  };
}

function saveAnswerToUser(authorizedUser, questionID, answer) {
  return {
    type: SAVE_ANSWER_TO_USER,
    authorizedUser,
    questionID,
    answer
  };
}

export function addQuestionToUser({ id, author }) {
  return {
    type: ADD_QUESTION_TO_USER,
    id,
    author
  };
}


export function handleSaveQuestionAnswer(authorizedUser, questionID, answer) {
  return dispatch => {
    dispatch(saveAnswerToUser(authorizedUser, questionID, answer));
    dispatch(saveAnswerToQuestion(authorizedUser, questionID, answer));

    return saveQuestionAnswer(authorizedUser, questionID, answer).catch(e => {
      console.warn('Error in handleSaveQuestionAnswer:', e);
    });
  };
}