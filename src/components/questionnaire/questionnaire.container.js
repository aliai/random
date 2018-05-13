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
import { answer, unAnswer, addQuestions, pickQuestion } from './questionnaire.actions';
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

      if (!randomQuestion) {
        // goto result page
      } else {
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
      // TODO: select next question
      const question = selectCurrentQuestion(questionnaire);

      dispatch(unAnswer(question.id));
      gotoNextQuestion();
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
