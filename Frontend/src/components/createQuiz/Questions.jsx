import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <form className="space-y-6">
        <fieldset className="border p-4 rounded-lg shadow-sm">
          <legend className="text-xl font-semibold text-gray-700 mb-4">Question</legend>
          
          {/* For the question */}
          <textarea
            name="question"
            cols="30"
            rows="6"
            placeholder="Enter your question"
            value={questions[currQuestionInd].question}
            onChange={(e) => inputHandler(e, currQuestionInd)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          
          {/* Options a, b, c, d */}
          {['a', 'b', 'c', 'd'].map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <label htmlFor={option} className="font-medium text-gray-700">{option})</label>
              <input
                type="text"
                name={option}
                placeholder={`Option ${index + 1}`}
                value={questions[currQuestionInd][option]}
                onChange={(e) => inputHandler(e, currQuestionInd)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          {/* For right answer */}
          <div className="flex items-center space-x-2">
            <label htmlFor="rightAnswer" className="font-medium text-gray-700">Correct answer)</label>
            <input
              type="text"
              name="rightAnswer"
              placeholder="Right Answer"
              value={questions[currQuestionInd].rightAnswer}
              onChange={(e) => inputHandler(e, currQuestionInd)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Add new question button */}
          {warning && <p className="text-red-500 text-sm">{warning}</p>}
          <button
            type="button"
            onClick={addHandler}
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
          >
            Add Question
          </button>
        </fieldset>
      </form>

      {/* Display the list of all questions */}
      <div className="mt-6 text-center">
        <button
          onClick={AllQuestionShow}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          All Questions
        </button>
      </div>
    </div>
  );
};

export default Questions;
