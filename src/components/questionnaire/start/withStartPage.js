import {
  compose,
  branch,
  renderComponent,
  withHandlers,
} from 'recompose';
import { addQuestions, fetchQuestions } from '../questionnaire.actions';
import {
  isLoading,
  selectQuestions,
} from '../questionnaire.reducer';
import { getQuestions } from '../../../api/questionnaire';
import StartView from './start';

const withStartPage = (stateName) => compose(
  withHandlers({
    loadQuestions: ({ dispatch }) => (difficulty) => {
      dispatch(fetchQuestions());
      getQuestions({ difficulty }).then((questions) => {
        dispatch(addQuestions(questions));
      });
    }
  }),
  branch(
    // start page, let the user choose the difficaulty level
    ({ [stateName]: questionnaire }) =>
      !isLoading(questionnaire) && selectQuestions(questionnaire).length === 0,
    renderComponent(StartView)
  ),
);

export default withStartPage;
