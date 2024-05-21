import quizData from './data.js'
import { useState } from 'react';
import './quizz.css';

const Quiz = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const currentQuestion = quizData[activeQuestion];
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const onClickNext = () => {
    setSelectedAnswerIndex(null)
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    )
    if (activeQuestion !== quizData.length - 1) {
      setActiveQuestion((prev) => prev + 1)
    } else {
      setActiveQuestion(0)
      setShowResult(true)
    }
  }

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index)
    const index1 = index+1;
    if (index1 === currentQuestion.correct) {
      setSelectedAnswer(true)
    } else {
      setSelectedAnswer(false)
    }
  }

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)


  return (
    <div className="quiz-container">
    { !showResult ? (
        <div>
      <div>
        <span className="active-question-no">{addLeadingZero(activeQuestion + 1)}</span>
        <span className="total-question">/{addLeadingZero(quizData.length)}</span>
      </div>
      <h1>Quiz</h1>
      <h2>{currentQuestion.question}</h2>
      <ul>
        {currentQuestion.answers.map((answer, index) => (
           <li onClick={() => onAnswerSelected(answer,index)} key={index} className={selectedAnswerIndex === index ? 'selected-answer' : null}>{answer}</li>
        ))}
      </ul>
      <div className="flex-right">
      <button onClick={onClickNext} disabled={selectedAnswerIndex === null}>
       {activeQuestion === quizData.length - 1 ? 'Finish' : 'Next'}
      </button>
      </div>
    </div>
  ):(
    <div className="result">
      <h3>Result</h3>
      <p>
        Total Question: <span>{quizData.length}</span>
      </p>
      <p>
        Total Score:<span> {result.score}</span>
      </p>
      <p>
        Correct Answers:<span> {result.correctAnswers}</span>
      </p>
      <p>
        Wrong Answers:<span> {result.wrongAnswers}</span>
      </p>
    </div>
  )}
</div>
)
}
  

export default Quiz;
