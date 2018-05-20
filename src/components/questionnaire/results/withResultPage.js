import {
  compose,
  branch,
  renderComponent,
} from 'recompose';
import Results from './results';
import {
  isLoading,
  selectUnansweredQuestions,
} from '../questionnaire.reducer';

const withResultPage = (stateName) => compose(
  branch(
    // show the results page
    ({ [stateName]: questionnaire }) =>
      !isLoading(questionnaire) && selectUnansweredQuestions(questionnaire).length === 0,
    renderComponent(Results)
  ),
);

export default withResultPage;
