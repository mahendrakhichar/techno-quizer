import { FaUserCircle, FaSignInAlt, FaUserPlus, FaTimes } from "react-icons/fa"; // Import the Close Icon (FaTimes)
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const UserDashboard = () => {
  const navigate = useNavigate();

  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signup = async () => {
    try {
      const response = await axios.post('/api/userAuth/signup', { name, email, password });
      console.log(response);
      if (response.data.success) {
        alert("account creted successfully")
        navigate('/attemptQuiz');
      } else {
        console.log('Unable to create the account');
        alert('this email is already registered')
      }
    } catch (err) {
      console.log("Something went wrong in sign-up", err);
    }
  };

  const login = async () => {
    try {
      const response = await axios.post('/api/userAuth/login', { email, password });
      console.log(response);
      if (response.data.success) {
        navigate('/attemptQuiz');
      } else {
        alert('there is no such account exist')
        console.log("Unable to log you in, try again.");
      }
    } catch (err) {
      console.log("Something went wrong in login", err);
    }
  };

  return (
    <div className="min-h-100 bg-gray-50 p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold text-gray-800 mb-2">User Dashboard</h1>
        <p className="text-lg text-gray-600">Attempt the quizzes created by your organization</p>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setIsSignUpOpen(true)}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md flex items-center gap-2 hover:bg-blue-600 transition ease-in-out"
        >
          <FaUserPlus className="text-xl" />
          Sign Up
        </button>
        <button
          onClick={() => setIsLoginOpen(true)}
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md flex items-center gap-2 hover:bg-green-600 transition ease-in-out"
        >
          <FaSignInAlt className="text-xl" />
          Login
        </button>
      </div>

      {/* Sign Up Modal */}
      {isSignUpOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div
            className="bg-white p-8 rounded-lg shadow-lg w-96 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsSignUpOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <FaTimes className="text-2xl" />
            </button>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Account</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-600">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={signup}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div
            className="bg-white p-8 rounded-lg shadow-lg w-96 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsLoginOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <FaTimes className="text-2xl" />
            </button>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login</h2>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              onClick={login}
              className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
