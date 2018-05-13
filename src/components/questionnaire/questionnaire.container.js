import {
  compose,
  branch,
  lifecycle,
  renderComponent,
  withReducer,
  withHandlers,
  withProps,
} from 'recompose';
import Questionnaire, { LoadingView } from './questionnaire';
import { answer, unAnswer, addQuestions, pickQuestion } from './questionnaire.actions';
import QuestionnaireReducer, {
  initialState,
  selectCurrentQuestion,
  selectRandomUnansweredQuestion
} from './questionnaire.reducer';

import { getQuestions, getAnswer } from '../../api/questionnaire';

const QuestionnaireContainer = compose(
  withReducer('questionnaire', 'dispatch', QuestionnaireReducer, initialState),
  lifecycle({
    componentDidMount() {
      const { dispatch } = this.props;

      getQuestions().then((questions) => {
        dispatch(addQuestions(questions));
        // TODO: select first question
        dispatch(pickQuestion(questions[0].id));
      });
    }
  }),
  withHandlers({
    onAnswerSelected: ({ dispatch, questionnaire }) => (value) => {
      const question = selectCurrentQuestion(questionnaire);

      dispatch(answer({ questionId: question.id, answer: value }));
    },
    onTimeout: ({ dispatch, questionnaire }) => () => {
      // TODO: select next question
      const question = selectCurrentQuestion(questionnaire);

      dispatch(unAnswer(question.id));
      dispatch(pickQuestion(selectRandomUnansweredQuestion(questionnaire).id));
    }
  }),
  branch(
    (props) => !selectCurrentQuestion(props.questionnaire),
    renderComponent(LoadingView)
  )
)(Questionnaire);

export default QuestionnaireContainer;
