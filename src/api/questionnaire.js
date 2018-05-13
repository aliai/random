export const getQuestions = () => {
  return Promise.resolve([
    {
      id: 1,
      question: 'question 1',
      options: [
        { value: 'foo', label: 'foo' },
        { value: 'bar', label: 'bar' },
        { value: 'baz', label: 'baz' },
        { value: 'yad', label: 'yad' },
      ],
    },
    {
      id: 2,
      question: 'question 2',
      options: [
        { value: 'foo', label: 'foo' },
        { value: 'bar', label: 'bar' },
        { value: 'baz', label: 'baz' },
        { value: 'yad', label: 'yad' },
      ],
    }
  ]);
}

export const getAnswer = (questionId, answer) => {
  return Promise.resolve(Math.random() * .5 < .5);
}
