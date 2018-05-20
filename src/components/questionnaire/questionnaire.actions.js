import {
  QUESTIONNAIR_ANSWER,
  QUESTIONNAIR_QUESTION_PICK,
  QUESTIONNAIR_QUESTIONS_FETCH,
  QUESTIONNAIR_QUESTIONS_SUCCESS,
  QUESTIONNAIR_LIFELINE_10_SEC,
  QUESTIONNAIR_LIFELINE_50_50,
} from './questionnaire.const';

export const answer = ({
  questionId,
  answer
}) => ({
  type: QUESTIONNAIR_ANSWER,
  payload: { questionId, answer }
});

export const answerTimeout = (questionId) => ({
  type: QUESTIONNAIR_ANSWER,
  payload: { questionId, answer: undefined }
});

export const addQuestions = (questions) => ({
  type: QUESTIONNAIR_QUESTIONS_SUCCESS,
  payload: questions
});

export const pickQuestion = (questionId) => ({
  type: QUESTIONNAIR_QUESTION_PICK,
  payload: questionId
});

export const fetchQuestions = questions => ({ type: QUESTIONNAIR_QUESTIONS_FETCH });

export const lifelineAdd10sec = () => ({ type: QUESTIONNAIR_LIFELINE_10_SEC });
export const lifelineRemoveHalfOptions = () => ({ type: QUESTIONNAIR_LIFELINE_50_50 });
