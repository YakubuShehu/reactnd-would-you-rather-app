// Actions for Question Retrieval & Saving

import { saveQuestion } from '../api-functions';
import { addQuestionToUser } from '../actions/users';

export const RETRIEVE_QUESTIONS = 'RETRIEVE_QUESTIONS';
export const SAVE_ANSWER_TO_QUESTION = 'SAVE_ANSWER_TO_QUESTION';
export const ADD_QUESTION = 'ADD_QUESTION';

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  };
}

export function retrieveQuestions( questions ) {
  return {
    type: RETRIEVE_QUESTIONS,
    questions
  };
}

export function saveAnswerToQuestion( authorizedUser, questionID, answer ) {
  return {
    type: SAVE_ANSWER_TO_QUESTION,
    authorizedUser,
    questionID,
    answer
  }
}

export function handleSaveQuestion(optionOneText, optionTwoText, author) {
  return dispatch => {
    return saveQuestion({ optionOneText, optionTwoText, author }).then(
      question => {
        dispatch(addQuestion(question));
        dispatch(addQuestionToUser(question));
      }
    );
  };
}


