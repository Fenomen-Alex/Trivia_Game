import React, {useCallback, useEffect, useState} from 'react';
import Question from './components/Question';
import CategorySelector from './components/CategorySelector';
import ResultModal from './components/ResultModal';
import Scoreboard from './components/Scoreboard';
import './App.css';

export default function App() {

  const [question, setQuestion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('any');
  const [isCorrect, setIsCorrect] = useState(null);

  const getQuestion = useCallback(() => {
    setIsCorrect(null);
    let url = 'https://opentdb.com/api.php?amount=1';
    if (selectedCategory !== 'any') url += `&category=${selectedCategory}`;

    fetch(url)
      .then(res => res.json())
      .then(data => setQuestion(data.results[0]))
  }, [selectedCategory]);

  const handleQuestionAnswered = (answer) => {
    const isAnswerCorrect = answer === question.correct_answer;
    setIsCorrect(isAnswerCorrect);
  }

  useEffect(() => {
    getQuestion();
  }, [getQuestion, selectedCategory]);

  return (
    <div className="app">
      {/* show the result modal ----------------------- */}
      { isCorrect !== null && (
        <ResultModal
          isCorrect={isCorrect}
          question={question}
          getQuestion={getQuestion}
        />
      )}

      {/* question header ----------------------- */}
      <div className="question-header">
        <CategorySelector
          category={selectedCategory}
          chooseCategory={setSelectedCategory}
        />
        <Scoreboard isCorrect={isCorrect} />
      </div>

      {/* the question itself ----------------------- */}
      <div className="question-main">
        {question && (
          <Question
            question={question}
            answerQuestion={handleQuestionAnswered}
          />
        )}
      </div>

      {/* question footer ----------------------- */}
      <div className="question-footer">
        <button onClick={getQuestion}>Go to next question 👉</button>
      </div>
    </div>
  );
}
