import React from 'react';

import './questionnaire.css';

import {
  selectAnswers,
  selectCurrentGivenAnswer,
  selectCurrentQuestion,
  selectCurrentStartTime,
} from './questionnaire.reducer';

import Question from './question';
import Counter from '../counter';

export default (props) => {
  const { answerSelectedHandler, timeoutHandler, questionnaire } = props;
  const question = selectCurrentQuestion(questionnaire);
  const givenAnswer = selectCurrentGivenAnswer(questionnaire);
  const startTime = selectCurrentStartTime(questionnaire);
  const answersCount = Object.keys(selectAnswers(questionnaire)).length;

  return (
    <div className="questionnaire">
      <section className="heading">
        <h3>Question {answersCount + 1}:</h3>
        <Counter startTime={startTime} timeout={15} onTimeout={timeoutHandler} />
      </section>
      <Question
        question={question}
        onAnswerSelected={answerSelectedHandler}
        selectedAnswer={givenAnswer && givenAnswer.answer}
      />
    </div>
  )
};

export const StartingView = ({
  gotoNextQuestion
}) => {
  return (
    <div className="questionnaire">
      <button onClick={gotoNextQuestion}>Start</button>
    </div>
  );
};

export const LoadingView = () => {
  return (
    'loading'
  )
};
