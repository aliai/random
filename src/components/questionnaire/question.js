import React from 'react';
import PropTypes from 'prop-types';

const Question = ({
  question,
  onAnswerSelected,
  selectedAnswer,
}) => {
  const onChangeHandler = (event) => {
    const { checked, value } = event.target;

    if (checked) {
      onAnswerSelected(value);
    }
  }

  return (
    <section className="question-box">
      <div className="question">{question.question}</div>
      <div className="options">
        {question.options.map(option => (
          <label key={option.value}>
            <input
              type="radio"
              name="answer"
              value={option.value}
              checked={selectedAnswer === option.value}
              onChange={onChangeHandler}
            /> {option.label}
          </label>
        ))}
      </div>
    </section>
  )
};

Question.propTypes = {
  question: PropTypes.shape({
    question: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })).isRequired,
  }).isRequired,
  selectedAnswer: PropTypes.string,
  onAnswerSelected: PropTypes.func.isRequired,
};

export default Question;
