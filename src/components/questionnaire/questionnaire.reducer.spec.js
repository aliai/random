import questionnaireReducer, {
  initialState,
  selectCurrentQuestion
} from './questionnaire.reducer';
import {
  addQuestions,
  pickQuestion,
  lifelineRemoveHalfOptions,
} from './questionnaire.actions';

const questions = [{
  id: 1,
  question: 'What does the International System of Quantities refer 1024 bytes as?',
  correctAnswer: '2',
  options: [
    { label: 'option 1', value: '1' },
    { label: 'option 2', value: '2' },
    { label: 'option 3', value: '3' },
    { label: 'option 4', value: '4' },
  ],
}];

describe('questionnaire reducer', () => {
  it('lifeline remove half options', () => {
    const state = reduce(
      addQuestions(questions),
      pickQuestion(1),
      lifelineRemoveHalfOptions()
    );
    const question = selectCurrentQuestion(state);
    const options = selectCurrentQuestion(state).options;

    expect(options.length).toBe(2);
    expect(options.find(o => o.value === question.correctAnswer)).not.toBeUndefined();
  })
});

const reduce = (...actions) => {
  return actions.reduce((state, action) => questionnaireReducer(state, action), initialState);
};
