import {
  compose,
  withReducer,
  withHandlers,
} from 'recompose';
import Questionnaire from './questionnaire';
import {
  answer,
  answerTimeout,
  lifelineAdd10sec,
  lifelineRemoveHalfOptions,
} from './questionnaire.actions';
import QuestionnaireReducer, {
  initialState,
  selectCurrentQuestion,
} from './questionnaire.reducer';
import { withAutoQuestionPicker } from './enhancers';
import { withStartPage } from './start';
import { withResultPage } from './results';
import { withLoadingPage } from './loading';

const stateName = 'questionnaire';
const QuestionnaireContainer = compose(
  withReducer(stateName, 'dispatch', QuestionnaireReducer, initialState),

  // goto next question when applicable
  withAutoQuestionPicker(stateName),

  // show the start screen to the user to choose the difficaulty
  withStartPage(stateName),

  // show the result page when the questionnaire is finished
  withResultPage(stateName),

  // show the loading page when the app is busy with the api call
  withLoadingPage(stateName),

  withHandlers({
    answerSelectedHandler: ({ dispatch, questionnaire }) => (value) => {
      const question = selectCurrentQuestion(questionnaire);

      dispatch(answer({ questionId: question.id, answer: value }));
    },
    timeoutHandler: ({ dispatch, questionnaire }) => () => {
      const question = selectCurrentQuestion(questionnaire);

      dispatch(answerTimeout(question.id));
    },
    lifelineRemoveHalfOptions: ({ dispatch }) => () => {
      dispatch(lifelineRemoveHalfOptions());
    },
    lifelineAdd10sec: ({ dispatch }) => () => {
      dispatch(lifelineAdd10sec());
    },
  }),

)(Questionnaire);

export default QuestionnaireContainer;
