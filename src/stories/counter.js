import React from 'react';
import { compose, withStateHandlers } from 'recompose';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Counter from '../components/counter';

storiesOf('Counter', module)
  .add('default', () => (
    <CounterTest />
  ))
  .add('timeout', () => (
    <Counter
      startTime={+new Date()}
      timeout={1}
      onTimeout={action('timeout')}
    />
  ))

const CounterTest = compose(
  withStateHandlers({
    startTime: +new Date(),
    timeout: 15
  }, {
      reset: () => () => {
        return { startTime: +new Date() }
      },
      add10sec: ({ startTime }) => () => {
        return { startTime: startTime + 10000 };
      }
    }),
)(({
  add10sec,
  timeout,
  startTime,
  reset,
}) => {
  return (
    <React.Fragment>
      <Counter startTime={startTime} timeout={timeout} />
      <button onClick={() => add10sec()}>Add 10sec</button>
      <button onClick={() => reset()}>Reset</button>
    </React.Fragment>
  );
});
