import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Eye } from 'lucide-react'; // Switching to Lucide icons as per project standards

const Questions = ({ questions, updateQuestions, currQuestionInd, updateCurrQuestionInd }) => {
  const navigate = useNavigate();
  const [warning, setWarning] = useState('');

  const inputHandler = (e, index) => {
    const { name, value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index][name] = value;
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
      setWarning("Please complete all fields before adding a new question.");
    }
  };

  const AllQuestionShow = () => {
    navigate('/createQuiz/Questions/AllQuestion', { state: { questions: questions } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f1f5f9' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="relative max-w-4xl mx-auto">
        {/* Question Counter */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
            Question {currQuestionInd + 1} of {questions.length}
          </span>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600">
            <h2 className="text-2xl font-bold text-white">Create Your Question</h2>
            <p className="mt-2 text-blue-100">Fill in all the details to create a comprehensive question</p>
          </div>

          <form className="p-8 space-y-6">
            {/* Question Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Question
              </label>
              <textarea
                name="question"
                rows="3"
                placeholder="Enter your question here..."
                value={questions[currQuestionInd].question}
                onChange={(e) => inputHandler(e, currQuestionInd)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['a', 'b', 'c', 'd'].map((option, index) => (
                <div key={index} className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <span className="w-6 h-6 flex items-center justify-center bg-blue-100 rounded-full text-blue-600 font-semibold mr-2">
                      {option.toUpperCase()}
                    </span>
                    Option
                  </label>
                  <input
                    type="text"
                    name={option}
                    placeholder={`Enter option ${option.toUpperCase()}`}
                    value={questions[currQuestionInd][option]}
                    onChange={(e) => inputHandler(e, currQuestionInd)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              ))}
            </div>

            {/* Correct Answer */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Correct Answer
              </label>
              <input
                type="text"
                name="rightAnswer"
                placeholder="Enter the correct answer (a, b, c, or d)"
                value={questions[currQuestionInd].rightAnswer}
                onChange={(e) => inputHandler(e, currQuestionInd)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Warning Message */}
            {warning && (
              <div className="rounded-lg bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{warning}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="button"
                onClick={addHandler}
                className="flex-1 inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Add New Question
              </button>
              <button
                type="button"
                onClick={AllQuestionShow}
                className="flex-1 inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <Eye className="w-5 h-5 mr-2" />
                View All Questions
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Questions;