import {
  QUESTIONNAIR_ANSWER,
  QUESTIONNAIR_QUESTION_PICK,
  QUESTIONNAIR_QUESTIONS_ADD,
} from './questionnaire.const';

export const answer = ({
  questionId,
  answer
}) => ({
  type: QUESTIONNAIR_ANSWER,
  payload: { questionId, answer }
});

export const unAnswer = (questionId) => ({
  type: QUESTIONNAIR_ANSWER,
  payload: { questionId, answer: undefined }
});

export const addQuestions = (questions) => ({
  type: QUESTIONNAIR_QUESTIONS_ADD,
  payload: questions
});

export const pickQuestion = (questionId) => ({
  type: QUESTIONNAIR_QUESTION_PICK,
  payload: questionId
});
