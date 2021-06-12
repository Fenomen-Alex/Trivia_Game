import React, {useEffect, useState} from 'react';
import Question from './components/Question';
import CategorySelector from './components/CategorySelector';
import ResultModal from './components/ResultModal';
import Scoreboard from './components/Scoreboard';
import './App.css';

export default function App() {

  const [question, setQuestion] = useState(null);

  const getQuestion = () => {
    const url = 'https://opentdb.com/api.php?amount=1';

    fetch(url)
      .then(res => res.json())
      .then(data => setQuestion(data.results[0]))
  }

  useEffect(() => {
    getQuestion();
  }, []);

  return (
    <div className="app">
      {/* show the result modal ----------------------- */}
      {/* <ResultModal /> */}

      {/* question header ----------------------- */}
      <div className="question-header">
        <CategorySelector />
        <Scoreboard />
      </div>

      {/* the question itself ----------------------- */}
      <div className="question-main">
        {question && <Question question={question}/>}
      </div>

      {/* question footer ----------------------- */}
      <div className="question-footer">
        <button>Go to next question 👉</button>
      </div>
    </div>
  );
}
