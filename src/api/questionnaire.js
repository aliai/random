import { randomize } from '../utils';

export const getQuestions = async ({
  amount = 10,
  difficulty = 'hard',
} = {}) => {
  const resp = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=18&difficulty=${difficulty}&type=multiple`);

  if (resp.status !== 200) return Promise.reject('Cannot connect to the server :(');

  const json = await resp.json();

  return json.results
    .map(({ question, correct_answer, incorrect_answers }, index) => ({
      id: index,
      question: question,
      correctAnswer: correct_answer,
      options: randomize([...incorrect_answers, correct_answer])
        .map(answer => ({
          value: answer,
          label: answer,
        }))
    }))
}
