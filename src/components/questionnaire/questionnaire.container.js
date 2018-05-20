import {
  compose,
  branch,
  lifecycle,
  renderComponent,
  withPropsOnChange,
  withReducer,
  withHandlers,
} from 'recompose';
import Questionnaire, { LoadingView, StartingView } from './questionnaire';
import Results from './results';
import {
  answer,
  answerTimeout,
  addQuestions,
  fetchQuestions,
  pickQuestion,
  lifelineAdd10sec,
  lifelineRemoveHalfOptions,
} from './questionnaire.actions';
import QuestionnaireReducer, {
  initialState,
  isLoading,
  selectCurrentGivenAnswer,
  selectCurrentQuestion,
  selectQuestions,
  selectUnansweredQuestions
} from './questionnaire.reducer';
import { randomize } from '../../utils';

import { getQuestions, validateAnswer } from '../../api/questionnaire';

const QuestionnaireContainer = compose(
  withReducer('questionnaire', 'dispatch', QuestionnaireReducer, initialState),
  withAutoQuestionPicker('questionnaire'),
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
    loadQuestions: ({ dispatch }) => (difficulty) => {
      dispatch(fetchQuestions());
      getQuestions({ difficulty }).then((questions) => {
        dispatch(addQuestions(questions));
      });
    }
  }),
  branch(
    // start page, let the user choose the difficaulty level
    ({ questionnaire }) => selectQuestions(questionnaire).length === 0,
    renderComponent(StartingView)
  ),
  branch(
    // waiting for the questions to be ready
    // alternatively show waiting screen while/if waiting for the next question
    ({ questionnaire }) =>
      isLoading(questionnaire) ||
      (!selectCurrentQuestion(questionnaire) && selectUnansweredQuestions(questionnaire).length > 0),
    renderComponent(LoadingView)
  ),
  branch(
    // show the results page
    ({ questionnaire }) => selectUnansweredQuestions(questionnaire).length === 0,
    renderComponent(Results)
  ),
)(Questionnaire);

const withAutoQuestionPicker = (
  stateName
) => compose(
  withHandlers({
    gotoNextQuestion: (props) => () => {
      const { [stateName]: questionnaire, dispatch } = props;
      const questions = selectUnansweredQuestions(questionnaire);
      const randomQuestion = randomize(questions).pop();

      dispatch(pickQuestion(randomQuestion && randomQuestion.id));
    },
  }),
  withPropsOnChange([stateName], (props) => {
    const { [stateName]: questionnaire, gotoNextQuestion } = props;
    if (
      // done loading questions
      !isLoading(questionnaire) &&
      // there are questions to pick from
      selectUnansweredQuestions(questionnaire).length > 0 &&
      // no questions have been picked, or the current question is answered
      (!selectCurrentQuestion(questionnaire) || selectCurrentGivenAnswer(questionnaire))
    ) {
      gotoNextQuestion();
    }
  }),
  );

export default QuestionnaireContainer;
