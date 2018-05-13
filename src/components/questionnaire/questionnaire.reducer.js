import {
  QUESTIONNAIR_ANSWER,
  QUESTIONNAIR_QUESTION_PICK,
  QUESTIONNAIR_QUESTIONS_ADD,
} from './questionnaire.const';

export const initialState = {
  currentQuestionId: undefined,
  currentQuestionStartTime: undefined,
  givenAnswers: {},
  questions: [],
};

export const selectQuestions = (state) => {
  return state.questions;
}

export const selectUnansweredQuestions = (state) => {
  return selectQuestions(state).filter(question => !state.givenAnswers[question.id]);
}

export const selectCurrentQuestion = (state) => {
  return selectQuestions(state).find(question => question.id === state.currentQuestionId);
}

export const selectCurrentGivenAnswer = (state) => {
  return selectGivenAnswer(state, state.currentQuestionId);
}

export const selectCurrentStartTime = (state) => {
  return state.currentQuestionStartTime;
}

export const selectGivenAnswer = (state, questionId) => {
  return selectAnswers(state)[questionId];
}

export const selectAnswers = (state) => {
  return state.givenAnswers;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case QUESTIONNAIR_ANSWER: {
      const { payload: { questionId, answer } } = action;

      return {
        ...state,
        givenAnswers: {
          ...state.givenAnswers,
          [questionId]: {
            answer,
            answeredTime: new Date().getTime() - state.currentQuestionStartTime
          }
        }
      };
    }
    case QUESTIONNAIR_QUESTION_PICK: {
      const { payload: questionId } = action;

      return {
        ...state,
        currentQuestionId: questionId,
        currentQuestionStartTime: new Date().getTime()
      }
    }
    case QUESTIONNAIR_QUESTIONS_ADD: {
      const { payload: questions } = action;

      return {
        ...state,
        questions
      }
    }
    default:
      return state;
  }
}
