import {
  QUESTIONNAIR_ANSWER,
  QUESTIONNAIR_QUESTION_PICK,
  QUESTIONNAIR_QUESTIONS_ADD,
} from './questionnaire.const';

export const initialState = {
  currentQuestionId: undefined,
  currentQuestionStartTime: undefined,
  givenAnswers: undefined,
  questions: undefined,
};

export const selectRandomUnansweredQuestion = (state) => {
  // typically this must be coming from the api; however, since we have a pool of questions
  // on the client, we will choose the next question
  return state.questions && state.questions
    .filter(question => !state.givenAnswers[question.id])
    .sort(() => Math.random() * 2 - 1)
    .pop()
}

export const selectCurrentQuestion = (state) => {
  return state.questions && state.questions.find(question => question.id === state.currentQuestionId);
}

export const selectCurrentGivenAnswer = (state) => {
  return selectGivenAnswer(state, state.currentQuestionId);
}

export const selectCurrentStartTime = (state) => {
  return state.currentQuestionStartTime;
}

export const selectGivenAnswer = (state, questionId) => {
  return state.givenAnswers && state.givenAnswers[questionId];
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
            time: new Date().getTime()
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
  }
}
