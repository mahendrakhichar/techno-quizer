import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const createHandler = () => {
    navigate('/createQuiz');
  };
  
  const attemptHandler = () => {
    navigate('/attemptQuiz');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-teal-200 via-pink-200 to-indigo-200 text-gray-800 p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold leading-tight mb-4 text-gray-900">Welcome to the Quiz App!</h1>
        <p className="text-xl text-gray-700">You can create your own quiz or attempt an existing one!</p>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={createHandler}
          className="px-8 py-3 bg-teal-400 hover:bg-teal-500 text-white font-semibold rounded-lg shadow-md transform transition-all duration-300 ease-in-out hover:scale-105"
        >
          Create Quiz
        </button>
        <button
          onClick={attemptHandler}
          className="px-8 py-3 bg-pink-400 hover:bg-pink-500 text-white font-semibold rounded-lg shadow-md transform transition-all duration-300 ease-in-out hover:scale-105"
        >
          Attempt Quiz
        </button>
      </div>
    </div>
  );
};

export default Home;
