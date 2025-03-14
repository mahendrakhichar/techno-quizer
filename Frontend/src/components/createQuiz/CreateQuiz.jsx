import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoIosRocket, IoIosCheckmarkCircleOutline } from 'react-icons/io'; // Icons for quiz vibe

const API_BASE_URL = "https://techno-quizer-2.onrender.com";
const CreateQuiz = ({name, updateName, code, updateCode}) => {
  const navigate = useNavigate();

  // State for quiz details
  // const [name, setName] = useState('');
  // const [code, setCode] = useState('');
  const [duration, setDuration] = useState('');
  const [totalQuestions, setTotalQuestions] = useState('');
  const [uniqueCode, setUniqueCode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check uniqueness of quiz code whenever the code changes
  useEffect(() => {
    const checkUniqness = async () => {
      if (!code.trim()) return;

      setLoading(true);
      try {
        console.log("Checking code:", code); // Log the code value
        const response = await axios.get(`${API_BASE_URL}/quizzes/checkCode/${code}`);
        console.log(response.data.message); // Log the response for debugging
        setUniqueCode(true);
      } catch (err) {
        console.log(err.response.data.message);
        setUniqueCode(false);
      } finally {
        setLoading(false);
      }
    };

    checkUniqness();
  }, [code]); // Runs when 'code' changes

  // Navigate to the next page only if the inputs are valid
  const nextHandler = (e) => {
    e.preventDefault();
    if (name.trim() && code.trim() && uniqueCode && duration && totalQuestions) {
      navigate('/createQuiz/questions');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 via-blue-100 to-indigo-200 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl transition-transform transform hover:scale-105">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          <IoIosRocket className="inline-block text-4xl text-teal-600 mr-2" />
          Let's Create Your Quiz
        </h1>
        <form onSubmit={nextHandler} className="space-y-6">
          {/* Quiz Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Quiz Name</label>
            <input
              type="text"
              placeholder="Enter your Quiz name"
              value={name}
              onChange={(e) => updateName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          {/* Quiz Code Input */}
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">Quiz Code</label>
            <input
              type="text"
              placeholder="Enter your Quiz code"
              value={code}
              onChange={(e) => updateCode(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
            {/* Code Status Message */}
            {loading ? (
              <p className="text-gray-500">Checking...</p>
            ) : uniqueCode ? (
              <p className="text-green-500 flex items-center">
                <IoIosCheckmarkCircleOutline className="mr-2 text-2xl text-green-500" />
                You can create the quiz
              </p>
            ) : (
              code.trim() && (
                <p className="text-red-500">
                  Quiz code already in use, try a different one.
                </p>
              )
            )}
          </div>

          {/* Duration Input */}
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
            <input
              type="number"
              placeholder="Enter duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          {/* Total Questions Input */}
          <div>
            <label htmlFor="totalQuestions" className="block text-sm font-medium text-gray-700 mb-2">Total Questions</label>
            <input
              type="number"
              placeholder="Enter number of questions"
              value={totalQuestions}
              onChange={(e) => setTotalQuestions(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          {/* Next Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={!name.trim() || !code.trim() || !uniqueCode || !duration || !totalQuestions} // Disable if inputs are not valid or code isn't unique
              className={`w-full py-2 px-4 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500
                ${!name.trim() || !code.trim() || !uniqueCode || !duration || !totalQuestions ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-500 text-white hover:bg-teal-600'}
              `}
            >
              <IoIosRocket className="inline-block mr-2 text-2xl" />
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;
