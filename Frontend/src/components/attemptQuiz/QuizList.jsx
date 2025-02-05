import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizList = () => {
  const [quizes, setQuizes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const QuizesHandler = async () => {
    try {
      const response = await axios.get('/api/quizzes/quizzesList');
      if (response.status === 200) {
        setQuizes(response.data);
        setIsLoading(false);
      } else {
        console.log('Failed to fetch quizzes', response.status);
        setIsLoading(false);
      }
    } catch (err) {
      console.log('Error fetching quizzes', err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    QuizesHandler();
  }, []);

  // navigation is needed
  const navigate = useNavigate();
  const handleClick = (totalQuestions) => {
    navigate('/quiz', { state: { totalQuestions } });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      {isLoading ? (
        <div className="text-center text-lg font-semibold text-gray-700">Loading...</div>
      ) : (
        <div>
          {quizes.length > 0 ? (
            <div className="space-y-4">
              {quizes.map((item, index) => (
                <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                  <div className="text-2xl font-semibold text-gray-800">{item.quizName}</div>
                  <div className="text-lg text-gray-600">{item.quizCode}</div>
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => handleClick(item.questions)}
                      className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Start Quiz
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-lg font-medium text-gray-700">No quizzes available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizList;
