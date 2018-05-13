import { getQuestions, validateAnswer } from './questionnaire';

it('api call: should resolve questions', async () => {
  const questions = await getQuestions({ amount: 10 });

  expect(questions.length).toBe(10);
});
