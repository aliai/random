import React from 'react';
import PropTypes from 'prop-types';

import {
  selectCurrentGivenAnswer,
  selectCurrentQuestion,
  selectCurrentStartTime,
} from './questionnaire.reducer';

import Question from './question';
import Counter from '../counter';

export default (props) => {
  const { onAnswerSelected, onTimeout, questionnaire } = props;
  const question = selectCurrentQuestion(questionnaire);
  const givenAnswer = selectCurrentGivenAnswer(questionnaire);
  const startTime = selectCurrentStartTime(questionnaire);

  return (
    <div className="questionnaire">
      <Counter startTime={startTime} timeout={15} onTimeout={onTimeout} />
      <Question
        question={question}
        onAnswerSelected={onAnswerSelected}
        selectedAnswer={givenAnswer && givenAnswer.answer}
      />
    </div>
  )
};

export const LoadingView = () => {
  return (
    'loading'
  )
};
