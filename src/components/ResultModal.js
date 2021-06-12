import React from 'react';

export default function ResultModal({isCorrect, getQuestion, question}) {
  return (
    <div className={`result-modal ${isCorrect ? 'is-correct' : 'is-wrong'}`}>
      <div className="overlay"/>
      <div className="result-modal-content">
        {isCorrect && (
          <h3>
            <span role="img" aria-label="emoji">👊👊👊</span>
            <br/>
            YOU WON!
          </h3>
        )}

        {!isCorrect && (
          <h3>
            <span role="img" aria-label="emoji">😟😢😟</span>
            <br/>
            YOU LOST!
          </h3>
        )}

        {!isCorrect && (
          <div className="correct-answer">
            <small>The correct answer was:</small>
            <br/>
            <strong dangerouslySetInnerHTML={{ __html: question.correct_answer }} />
          </div>
        )}

        <button onClick={getQuestion}>Go to next question <span role="img" aria-label="emoji">👉</span></button>
      </div>
    </div>
  );
}
