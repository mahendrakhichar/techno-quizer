import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const AllQuestion = ({ name, code }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Safely access and parse questions from location state
  const questions = location.state?.questions ? 
    JSON.parse(JSON.stringify(location.state.questions)) : 
    [];

  const createQuizHandler = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Remove the last empty question and sanitize the data
      const validQuestions = questions
        .slice(0, -1)
        .filter(q => q.question && q.a && q.b && q.c && q.d && q.rightAnswer)
        .map(q => ({
          question: String(q.question),
          a: String(q.a),
          b: String(q.b),
          c: String(q.c),
          d: String(q.d),
          rightAnswer: String(q.rightAnswer)
        }));

      if (validQuestions.length === 0) {
        alert('Please add at least one valid question before creating the quiz.');
        setIsSubmitting(false);
        return;
      }

      const data = {
        name: String(name),
        code: String(code),
        totalQuestions: validQuestions
      };
      //adding security to routes using jwt 
      const token = localStorage.getItem('token');
      if(!token){
        alert('Please, login first to create the quiz');
        return;
      }

      const response = await axios.post('/api/quizzes/createQuiz', data,{
        headers:{
          'Authorization':`Bearer ${token}`,
        }
      });

      if (response.status === 200 || response.status === 201) {
        alert('Quiz created successfully!');
        navigate('/'); // Navigate to home page after success
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (err) {
      console.error('Error creating quiz:', err);
      alert('Failed to create quiz. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="text-center text-xl font-semibold text-gray-700">
        No questions present yet
      </div>
    );
  }

  const validQuestions = questions.filter((question) => 
    question.question && 
    question.a && 
    question.b && 
    question.c && 
    question.d && 
    question.rightAnswer
  );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Quiz Name: {name}</h1>
        <h2 className="text-xl text-gray-600">Quiz Code: {code}</h2>
      </div>

      <div className="space-y-6">
        {validQuestions.length > 0 ? (
          validQuestions.map((item, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-md shadow-sm">
              <h3 className="text-xl font-medium text-gray-800">Question {index + 1}:</h3>
              <p className="text-lg text-gray-700">{item.question}</p>
              <ul className="mt-2 space-y-2 text-gray-600">
                <li>a) {item.a}</li>
                <li>b) {item.b}</li>
                <li>c) {item.c}</li>
                <li>d) {item.d}</li>
                <li>Answer: {item.rightAnswer}</li>
              </ul>
            </div>
          ))
        ) : (
          <div className="text-center text-lg font-medium text-gray-700">
            No valid questions available
          </div>
        )}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={createQuizHandler}
          disabled={isSubmitting}
          className={`px-6 py-3 bg-blue-500 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isSubmitting 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-blue-600'
          }`}
        >
          {isSubmitting ? 'Creating Quiz...' : 'Create Quiz'}
        </button>
      </div>
    </div>
  );
};

export default AllQuestion;