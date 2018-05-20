import {
  compose,
  branch,
  renderComponent,
} from 'recompose';
import {
  isLoading,
  selectCurrentQuestion,
  selectUnansweredQuestions,
} from '../questionnaire.reducer';
import { LoadingView } from './loading';

const withLoadingPage = (stateName) => compose(
  branch(
    // waiting for the questions to be ready
    // alternatively show waiting screen while/if waiting for the next question
    ({ [stateName]: questionnaire }) =>
      isLoading(questionnaire) ||
      (!selectCurrentQuestion(questionnaire) && selectUnansweredQuestions(questionnaire).length > 0),
    renderComponent(LoadingView)
  ),
);

export default withLoadingPage;
