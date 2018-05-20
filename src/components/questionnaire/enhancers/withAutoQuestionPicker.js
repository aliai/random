import {
  compose,
  withPropsOnChange,
  withHandlers,
} from 'recompose';
import { pickQuestion } from '../questionnaire.actions';
import {
  isLoading,
  selectCurrentGivenAnswer,
  selectCurrentQuestion,
  selectUnansweredQuestions
} from '../questionnaire.reducer';
import { randomize } from '../../../utils';

const withAutoQuestionPicker = (stateName) => compose(
  withHandlers({
    gotoNextQuestion: ({ [stateName]: questionnaire, dispatch }) => () => {
      const questions = selectUnansweredQuestions(questionnaire);
      const randomQuestion = randomize(questions).pop();

      dispatch(pickQuestion(randomQuestion && randomQuestion.id));
    },
  }),
  withPropsOnChange([stateName], ({ [stateName]: questionnaire, gotoNextQuestion }) => {
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

export default withAutoQuestionPicker;
