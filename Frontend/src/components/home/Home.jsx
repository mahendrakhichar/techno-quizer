import React, { useState } from 'react';
import AdminLogin from '../logins/AdminLogin';  // Assuming the AdminDashboard component is in the same folder
import UserLogin from '../logins/UserLogin';  // Assuming the UserDashboard component is in the same folder

const Home = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  const createHandler = () => {
    setIsAdminOpen(true);
    setIsUserOpen(false);
  };
  
  const attemptHandler = () => {
    setIsUserOpen(true);
    setIsAdminOpen(false);
  };

  const closeModal = () => {
    setIsAdminOpen(false);
    setIsUserOpen(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-teal-200 via-pink-200 to-indigo-200 text-gray-800 p-6">
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

      {/* Admin Dashboard Modal */}
      {isAdminOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg w-11/12 sm:w-96 lg:w-1/2 max-w-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <AdminLogin />
            <button
              onClick={closeModal}
              className="mt-4 w-full px-6 py-3 bg-red-500 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* User Dashboard Modal */}
      {isUserOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg w-11/12 sm:w-96 lg:w-1/2 max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <UserLogin />
            <button
              onClick={closeModal}
              className="mt-4 w-full px-6 py-3 bg-red-500 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
