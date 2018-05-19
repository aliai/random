import React from 'react';
import PropTypes from 'prop-types';
import getColor from './counter-color';
import './counter.css';

export default class extends React.Component {
  static propTypes = {
    startTime: PropTypes.number.isRequired,
    timeout: PropTypes.number.isRequired,
    onTimeout: PropTypes.func,
  }

  componentDidMount() {
    this._intervalHandler = setInterval(() => {
      if (!this._pause) this.forceUpdate();
    }, 100);
  }

  componentDidUpdate() {
    if (this.reminder <= 0) {
      // pasue and notify the parent that the time is out
      this._pause = true;
      if (typeof this.props.onTimeout === 'function') {
        this.props.onTimeout();
      }
    } else {
      // continue counting
      this._pause = false;
    }
  }

  componentWillUnmount() {
    clearInterval(this._intervalHandler);
  }

  get reminder() {
    const { startTime, timeout } = this.props;
    const reminder = timeout - (new Date().getTime() - startTime) / 1000;

    return reminder < 0 ? 0 : reminder;
  }

  render() {
    const reminder = this.reminder;
    const fixedReminder = reminder.toFixed(1);
    const className = ['count-down-circle', (reminder === 0 ? 'timeout' : '')].join(' ');
    const color = getColor(reminder);

    return (
      <div
        className={className}
        style={{ color }}
      >{fixedReminder}</div>
    );
  }
}
