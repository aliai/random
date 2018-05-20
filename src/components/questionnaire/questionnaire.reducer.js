import {
  QUESTIONNAIR_ANSWER,
  QUESTIONNAIR_QUESTION_PICK,
  QUESTIONNAIR_QUESTIONS_ADD,
  QUESTIONNAIR_LIFELINE_10_SEC,
  QUESTIONNAIR_LIFELINE_50_50,
} from './questionnaire.const';
import { randomize } from '../../utils';

export const initialState = {
  currentQuestionId: undefined,
  currentQuestionStartTime: undefined,
  lifeline: {
    removeHalf: false,
    add10sec: false,
  },
  givenAnswers: {},
  questions: [],
};

export const selectUsedLifelineAdd10Sec = state => state.lifeline.add10sec;
export const selectUsedLifelineRemoveHalf = state => state.lifeline.removeHalf;

export const selectQuestions = (state) => {
  return state.questions;
}

export const selectUnansweredQuestions = (state) => {
  return selectQuestions(state).filter(question => !state.givenAnswers[question.id]);
}

export const selectCurrentQuestion = (state) => {
  return selectUnansweredQuestions(state)
    .find(question => question.id === state.currentQuestionId);
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
    case QUESTIONNAIR_LIFELINE_10_SEC: {
      return {
        ...state,
        lifeline: {
          ...state.lifeline,
          add10sec: true,
        },
        currentQuestionStartTime: state.currentQuestionStartTime + 10000
      }
    }
    case QUESTIONNAIR_LIFELINE_50_50: {
      const question = selectCurrentQuestion(state);

      return {
        ...state,
        lifeline: {
          ...state.lifeline,
          removeHalf: true,
        },
        questions: [
          ...state.questions.filter(q => q.id !== state.currentQuestionId),
          {
            ...question,
            options: [
              question.options.find(option => option.value === question.correctAnswer),
              randomize(
                question.options.filter(option => option.value !== question.correctAnswer)
              ).pop()
            ]
          }
        ]
      }
    }
    default:
      return state;
  }
}
