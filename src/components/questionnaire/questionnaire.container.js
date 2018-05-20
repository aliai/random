import {
  compose,
  branch,
  lifecycle,
  renderComponent,
  withReducer,
  withHandlers,
} from 'recompose';
import Questionnaire, { LoadingView, StartingView } from './questionnaire';
import Results from './results';
import {
  answer,
  unAnswer,
  addQuestions,
  pickQuestion,
  lifelineAdd10sec,
  lifelineRemoveHalfOptions,
} from './questionnaire.actions';
import QuestionnaireReducer, {
  initialState,
  selectCurrentQuestion,
  selectQuestions,
  selectUnansweredQuestions
} from './questionnaire.reducer';
import { randomize } from '../../utils';

import { getQuestions, validateAnswer } from '../../api/questionnaire';

const QuestionnaireContainer = compose(
  withReducer('questionnaire', 'dispatch', QuestionnaireReducer, initialState),
  lifecycle({
    componentDidMount() {
      const { dispatch } = this.props;

      getQuestions().then((questions) => {
        dispatch(addQuestions(questions));
      });
    }
  }),
  withHandlers({
    gotoNextQuestion: ({ dispatch, questionnaire }) => () => {
      const questions = selectUnansweredQuestions(questionnaire);
      const randomQuestion = randomize(questions).pop();

      if (randomQuestion) {
        dispatch(pickQuestion(randomQuestion.id));
      }
    },
  }),
  withHandlers({
    answerSelectedHandler: ({ dispatch, questionnaire, gotoNextQuestion }) => (value) => {
      const question = selectCurrentQuestion(questionnaire);

      console.count('answered');

      dispatch(answer({ questionId: question.id, answer: value }));
      gotoNextQuestion();
    },
    timeoutHandler: ({ dispatch, questionnaire, gotoNextQuestion }) => () => {
      const question = selectCurrentQuestion(questionnaire);

      dispatch(unAnswer(question.id));
      gotoNextQuestion();
    },
    lifelineRemoveHalfOptions: ({ dispatch }) => () => {
      dispatch(lifelineRemoveHalfOptions());
    },
    lifelineAdd10sec: ({ dispatch }) => () => {
      dispatch(lifelineAdd10sec());
    }
  }),
  branch(
    (props) => selectQuestions(props.questionnaire).length === 0,
    renderComponent(LoadingView)
  ),
  branch(
    (props) => !selectCurrentQuestion(props.questionnaire),
    renderComponent(StartingView)
  ),
  branch(
    (props) => selectUnansweredQuestions(props.questionnaire).length === 0,
    renderComponent(Results)
  )
)(Questionnaire);

export default QuestionnaireContainer;
