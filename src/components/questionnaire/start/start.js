import React from 'react';

export default ({
  loadQuestions
}) => {
  return (
    <div className="questionnaire">
      <p>
        How confident are you about computers?
      </p>
      <button onClick={() => loadQuestions('easy')}>
        <span role="img" aria-label="baby">👶🏻</span> Please don't hurt me
      </button>
      <button onClick={() => loadQuestions('medium')}>
        <span role="img" aria-label="nerd">🤓</span> Lagom
      </button>
      <button onClick={() => loadQuestions('hard')}>
        <span role="img" aria-label="supernerd">👻</span> Bring it on
      </button>
    </div>
  );
};