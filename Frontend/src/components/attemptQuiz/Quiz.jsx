import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const Quiz = () => {
  const location = useLocation();
  const { totalQuestions } = location.state || {};

  // Check if totalQuestions is an array before mapping over it
  if (!Array.isArray(totalQuestions)) {
    return (
      <div className="text-center text-xl font-semibold text-gray-700">
        No questions available
      </div>
    );
  }

  // State to track the selected option for each question
  const [selectedAnswers, setSelectedAnswers] = useState(
    totalQuestions.map(() => null) // Initialize with null (no answer selected)
  );
  const [marks, setMarks] = useState(0);

  // Handle selecting an answer for a particular question
  const handleAnswerSelection = (index, answer) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[index] = answer; // Set the selected answer for this question
    setSelectedAnswers(updatedAnswers);
  };

  // Submit the quiz
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = () => {
    setSubmitted(true);
    alert('Quiz submitted!');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <div className="space-y-6">
        {totalQuestions.map((item, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-medium text-gray-800">
              {item.question}
            </h2>
            <div className="mt-4 space-y-3">
              {['a', 'b', 'c', 'd'].map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center">
                  {/* Radio button for each option */}
                  <input
                    type="radio"
                    id={`${item.question}-${option}`}
                    name={`question-${index}`} // Grouping radio buttons by question
                    value={item[option]}
                    checked={selectedAnswers[index] === item[option]}
                    onChange={() => {
                      if (item[option] === item.rightAnswer) {
                        setMarks(marks + 1);
                      }
                      handleAnswerSelection(index, item[option]);
                    }}
                    className="h-5 w-5 text-blue-500 border-gray-300 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`${item.question}-${option}`}
                    className="ml-3 text-gray-700"
                  >
                    {item[option]}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit Quiz
        </button>
      </div>

      {submitted && (
        <div className="mt-4 text-center text-xl font-semibold text-green-600">
          <p>
            Quiz submitted successfully! Your score: {marks} /{' '}
            {totalQuestions.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
