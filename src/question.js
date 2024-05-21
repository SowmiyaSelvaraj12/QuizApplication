import quizData from "./data";
import "./style.css";
import { useState } from "react";
const Question = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const currentQuestion = quizData[currentQuestionIndex];
  const count = 7;

  const handleOptionClick = (selectedOptionIndex) => {
    setSelectedOption(selectedOptionIndex);
    
  };

  const handleNextClick = () => {
    
    if (selectedOption !== null) {
      if (selectedOption === currentQuestion.correct) {
        // If correct, increment the score
        setScore(score + 1);
      
        console.log(score);
      }
      setSelectedOption(null);
    

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      
      setShowResult(true);
    }
  }else{
    alert("Please select an option before proceeding.");
  }
  };

  return (
    <div>
      {!showResult ? (
        <div>
          <div class="quiz-question">
            <h3>Question {currentQuestionIndex + 1}</h3>
            <p>{currentQuestion.question}</p>
          </div>
          <ul className="quiz-options">
            {currentQuestion.answers.map((answer, index) => (
              
              <li
                key={index}
                className="quiz-option"
                // onClick={() => handleOptionClick(index)}
              >
                <span>{String.fromCharCode(65 + index)}</span>
                {/* <p>{answer}</p> */}

                <button
                  className={selectedOption === index ? "selected" : ""}
                  onClick={() => handleOptionClick(index)}
                >
                  {answer}
                </button>
              </li>
              
            ))}
          </ul>
          <div class="submit">
            <button className="next-button" onClick={handleNextClick}>
            Next
            </button>
            </div>
          
        </div>
      ) : (
        <div>
          <h3>Congratulations!</h3>
          <p>You have Completed the quiz</p>
          <p>You got {score}out of 7 right</p>
        </div>
      )}
    </div>
  );
};

export default Question;
