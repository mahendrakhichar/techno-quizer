import { useLocation } from "react-router-dom";
import { useState } from "react";

const Quiz = () => {
  const location = useLocation();
  const { totalQuestions } = location.state || {};

  if (!Array.isArray(totalQuestions)) {
    return (
      <div className="text-center text-xl font-semibold text-gray-700">
        No questions available
      </div>
    );
  }

  const [selectedAnswers, setSelectedAnswers] = useState(
    totalQuestions.map(() => null)
  );
  const [submitted, setSubmitted] = useState(false);
  const [marks, setMarks] = useState(0);

  // Handle selecting an answer
  const handleAnswerSelection = (index, answer) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[index] = answer;
    setSelectedAnswers(updatedAnswers);
  };

  // Calculate score only on submit
  const handleSubmit = () => {
    let score = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === totalQuestions[index].answer) {
        score++;
      }
    });

    setMarks(score);
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <div className="space-y-6">
        {totalQuestions.map((item, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-medium text-gray-800">{item.question}</h2>
            <div className="mt-4 space-y-3">
              {item.options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className={`flex items-center p-2 rounded-lg ${
                    submitted
                      ? option === item.answer
                        ? "bg-green-200" // Highlight correct answer in green
                        : selectedAnswers[index] === option
                        ? "bg-red-200" // Highlight wrong answer in red
                        : "bg-white"
                      : "bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    id={`question-${index}-option-${optionIndex}`}
                    name={`question-${index}`}
                    value={option}
                    checked={selectedAnswers[index] === option}
                    onChange={() => handleAnswerSelection(index, option)}
                    disabled={submitted} // Disable selection after submission
                    className="h-5 w-5 text-blue-500 border-gray-300 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`question-${index}-option-${optionIndex}`}
                    className="ml-3 text-gray-700"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
            {/* Show correct answer after submission */}
            {submitted && (
              <p className="mt-2 text-sm font-medium text-green-600">
                Correct Answer: {item.answer}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Hide Submit button after submission */}
      {!submitted && (
        <div className="mt-6 text-center">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Quiz
          </button>
        </div>
      )}

      {submitted && (
        <div className="mt-4 text-center text-xl font-semibold text-green-600">
          <p>
            Quiz submitted successfully! Your score: {marks} / {totalQuestions.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
