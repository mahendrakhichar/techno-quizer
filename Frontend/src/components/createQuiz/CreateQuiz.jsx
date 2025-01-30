import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateQuiz = ({ name, updateName, code, updateCode }) => {
  const navigate = useNavigate();

  const nextHandler = (e) => {
    e.preventDefault(); // Prevent the form from reloading the page
    navigate('/createQuiz/questions'); // Navigate to the next page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Let's create your Quiz</h1>
        <form onSubmit={nextHandler} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Your Quiz name"
              value={name} // Make sure to set value so it's controlled
              onChange={(e) => updateName(e.target.value)}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">Code</label>
            <input
              type="text"
              placeholder="Your Quiz code"
              value={code} // Set the value for the input field
              onChange={(e) => updateCode(e.target.value)}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;
