import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosAddCircle, IoIosEye } from 'react-icons/io'; // Lucid-React Icons

const Questions = ({ questions, updateQuestions, currQuestionInd, updateCurrQuestionInd }) => {
  const navigate = useNavigate();
  const [warning, setWarning] = useState('');

  const inputHandler = (e, index) => {
    const { name, value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index][name] = value; // Update the specific field in the state
    updateQuestions(updatedQuestions);
  };

  const addHandler = () => {
    const currentQuestion = questions[currQuestionInd];

    if (currentQuestion.a && currentQuestion.b && currentQuestion.c && currentQuestion.d && currentQuestion.question && currentQuestion.rightAnswer) {
      updateQuestions((prevQuestions) => [
        ...prevQuestions,
        { question: '', a: '', b: '', c: '', d: '', rightAnswer: '' },
      ]);
      updateCurrQuestionInd(currQuestionInd + 1);
      setWarning('');
    } else {
      setWarning("Please complete your question first.");
    }
  };

  const AllQuestionShow = () => {
    navigate('/createQuiz/Questions/AllQuestion', { state: { questions: questions } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 via-blue-100 to-indigo-200 p-6">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-xl transition-transform transform hover:scale-105">
        <form className="space-y-8">
          <fieldset className="border p-6 rounded-lg shadow-sm">
            <legend className="text-2xl font-semibold text-gray-800 mb-4">Create a Question</legend>
            
            {/* Question Input */}
            <div className="space-y-4">
              <label className="block text-lg font-medium text-gray-700">Question:</label>
              <textarea
                name="question"
                rows="4"
                placeholder="Enter your question here"
                value={questions[currQuestionInd].question}
                onChange={(e) => inputHandler(e, currQuestionInd)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              ></textarea>
            </div>
            
            {/* Options Input */}
            {['a', 'b', 'c', 'd'].map((option, index) => (
              <div key={index} className="space-y-2">
                <label htmlFor={option} className="block font-medium text-gray-700">{option})</label>
                <input
                  type="text"
                  name={option}
                  placeholder={`Option ${index + 1}`}
                  value={questions[currQuestionInd][option]}
                  onChange={(e) => inputHandler(e, currQuestionInd)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            ))}

            {/* Right Answer Input */}
            <div className="space-y-2">
              <label htmlFor="rightAnswer" className="block font-medium text-gray-700">Correct Answer:</label>
              <input
                type="text"
                name="rightAnswer"
                placeholder="Enter the correct answer"
                value={questions[currQuestionInd].rightAnswer}
                onChange={(e) => inputHandler(e, currQuestionInd)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Warning message */}
            {warning && <p className="text-red-500 text-sm mt-2">{warning}</p>}

            {/* Add Question Button */}
            <button
              type="button"
              onClick={addHandler}
              className="w-full py-3 px-4 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 mt-4"
            >
              <IoIosAddCircle className="inline-block mr-2 text-xl" />
              Add Question
            </button>
          </fieldset>
        </form>

        {/* All Questions Button */}
        <div className="mt-8 text-center">
          <button
            onClick={AllQuestionShow}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <IoIosEye className="inline-block mr-2 text-xl" />
            View All Questions
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questions;
