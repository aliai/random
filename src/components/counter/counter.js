import React from 'react';
import PropTypes from 'prop-types';

export default class extends React.Component {
  static propTypes = {
    startTime: PropTypes.number.isRequired,
    timeout: PropTypes.number.isRequired,
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
    const fixedReminder = this.reminder.toFixed(1);

    return (
      <div>{fixedReminder}</div>
    );
  }
}
