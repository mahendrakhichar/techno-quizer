import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi"; // Importing search icon

const QuizList = () => {
  const [quizes, setQuizes] = useState([]);
  const [filteredQuizes, setFilteredQuizes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchCode, setSearchCode] = useState("");

  const navigate = useNavigate();

  const QuizesHandler = async () => {
    const token = localStorage.getItem('token');
    if(!token){
      alert('Please, Login first');
      return;
    }
    try {
      const response = await axios.get("/api/quizzes/quizzesList",
        {
          headers:{
            'Authorization' : `Bearer ${token}`,
          }
        }
      );
      if (response.status === 200) {
        setQuizes(response.data);
        setFilteredQuizes(response.data);
        setIsLoading(false);
      } else {
        console.log("Failed to fetch quizzes", response.status);
        setIsLoading(false);
      }
    } catch (err) {
      console.log("Error fetching quizzes", err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    QuizesHandler();
  }, []);

  // Handle Search
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchCode(value);

    if (value.trim() === "") {
      setFilteredQuizes(quizes);
    } else {
      const filtered = quizes.filter((quiz) =>
        quiz.quizCode.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredQuizes(filtered);
    }
  };

  const handleClick = (totalQuestions) => {
    navigate("/quiz", { state: { totalQuestions } });
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      {/* Search Section */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-md">
          <FiSearch className="absolute left-3 top-3 text-gray-500 text-xl" />
          <input
            type="text"
            placeholder="Search by Quiz Code..."
            value={searchCode}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-3 border rounded-lg text-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Quiz Section */}
      <div className="p-8 bg-white rounded-lg shadow-lg">
        {isLoading ? (
          <div className="text-center text-xl font-semibold text-gray-700">
            Loading...
          </div>
        ) : (
          <div>
            {filteredQuizes.length > 0 ? (
              <div className="space-y-6">
                {filteredQuizes.map((item, index) => (
                  <div
                    key={index}
                    className="p-6 bg-gray-100 rounded-lg shadow-md"
                  >
                    <div className="flex justify-between items-center text-xl mb-3">
                      <span className="font-semibold text-gray-900">
                        📝 {item.quizName}
                      </span>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                        Code: {item.quizCode}
                      </span>
                    </div>
                    <div className="text-center">
                      <button
                        onClick={() => handleClick(item.questions)}
                        className="px-5 py-2 bg-blue-500 text-white text-md font-medium rounded-md hover:bg-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Start Quiz
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-lg font-medium text-gray-700">
                No quizzes found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizList;
