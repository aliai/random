import React from 'react';

import {
  selectAnswers,
  selectQuestions,
} from '../questionnaire.reducer';

export default ({ questionnaire }) => {
  const questions = selectQuestions(questionnaire);
  const answers = selectAnswers(questionnaire);

  const orderedCorrectAnswers = questions
    .filter(question => answers[question.id].answer === question.correctAnswer)
    .sort((q1, q2) => answers[q1.id].answeredTime - answers[q2.id].answeredTime)
    .map(quesiton => ({ quesiton, answeredTime: answers[quesiton.id].answeredTime }))
  const unAnsweredQuestions = questions
    .filter(question => answers[question.id].answer === undefined);
  const wrongAnsweredQuestions = questions
    .filter(question =>
      answers[question.id].answer !== undefined &&
      answers[question.id].answer !== question.correctAnswer);

  const fastestAnswer = orderedCorrectAnswers[0];
  const slowestAnswer = orderedCorrectAnswers[orderedCorrectAnswers.length - 1];
  const avgAnswerTime = orderedCorrectAnswers
    .reduce((sum, { answeredTime }) => sum + answeredTime, 0) / orderedCorrectAnswers.length;

  return (
    <div className="result-box">
      <p>
        <label>Correct answers:</label> {orderedCorrectAnswers.length}
      </p>
      <p>
        <label>Wrong answers:</label> {wrongAnsweredQuestions.length}
      </p>
      <p>
        <label>Unanswered:</label> {unAnsweredQuestions.length}
      </p>
      {orderedCorrectAnswers.length ?
        (
          <React.Fragment>
            <p>
              <label>Fastest:</label> {timeToAnswer(fastestAnswer.answeredTime)}
            </p>
            <div>{fastestAnswer.quesiton.question}</div>
            <p>
              <label>Slowest:</label> {timeToAnswer(slowestAnswer.answeredTime)}
            </p>
            <div>{slowestAnswer.quesiton.question}</div>
            <p>
              <label>Average:</label> {timeToAnswer(avgAnswerTime)}
            </p>
          </React.Fragment>
        ) : null}

    </div>
  );
};

const timeToAnswer = (ms) => (
  <span className="time">{(ms / 1000).toFixed(2)}s</span>
)
