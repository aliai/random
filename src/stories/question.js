import React from 'react';
import { compose, withStateHandlers } from 'recompose';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Question from '../components/questionnaire/question';

const questions = [{
  question: 'What does the International System of Quantities refer 1024 bytes as?',
  options: [
    { label: 'option 1', value: '1' },
    { label: 'option 2', value: '2' },
    { label: 'option 3', value: '3' },
    { label: 'option 4', value: '4' },
  ],
}, {
  question: 'What does the International System of Quantities refer 1024 bytes as?',
  options: [
    { label: 'option 1', value: '1' },
    { label: 'option 2', value: '2' },
    { label: 'option 3', value: '3' },
    { label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt', value: '4' },
  ],
}];

storiesOf('Question', module)
  .add('default', () => (
    <React.Fragment>
      <Question question={questions[0]} onAnswerSelected={action('Answered')} />
      <Question question={questions[1]} onAnswerSelected={action('Answered')} />
    </React.Fragment>
  ));
