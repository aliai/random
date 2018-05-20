import React from 'react';

import './questionnaire.css';

import {
  selectAnswers,
  selectCurrentGivenAnswer,
  selectCurrentQuestion,
  selectCurrentStartTime,
  selectUsedLifelineAdd10Sec,
  selectUsedLifelineRemoveHalf,
} from './questionnaire.reducer';

import Question from './question';
import Counter from '../counter';

export default (props) => {
  const {
    answerSelectedHandler,
    timeoutHandler,
    questionnaire,
    lifelineAdd10sec,
    lifelineRemoveHalfOptions,
  } = props;
  const question = selectCurrentQuestion(questionnaire);
  const givenAnswer = selectCurrentGivenAnswer(questionnaire);
  const startTime = selectCurrentStartTime(questionnaire);
  const answersCount = Object.keys(selectAnswers(questionnaire)).length;
  const hideLifelineRemoveHalf = selectUsedLifelineRemoveHalf(questionnaire);
  const hideLifelineAdd10Sec = selectUsedLifelineAdd10Sec(questionnaire);

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
      <section className="lifeline">
        {hideLifelineRemoveHalf ? null :
          <div onClick={lifelineRemoveHalfOptions}>50 / 50</div>}
        {hideLifelineAdd10Sec ? null :
          <div onClick={lifelineAdd10sec}>+10sec</div>}
      </section>
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
