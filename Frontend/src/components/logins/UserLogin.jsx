import { FaUserCircle, FaSignInAlt, FaUserPlus, FaTimes } from "react-icons/fa"; // Import the Close Icon (FaTimes)
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
//redux
import { useDispatch, useSelector } from "react-redux";
import { logIn, logout } from "../../redux/userSlice";

const API_BASE_URL = "https://techno-quizer-2.onrender.com";
const UserLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid , setValid] = useState(true); // it will be useful to check and give errors which we get on wrong authentication 

  const signup = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/userAuth/signup`, { name, email, password });
      console.log(response);
      if (response.data.success) {
        setIsSignUpOpen(false);
        // navigate('/attemptQuiz');
      } else {
        setValid(false);
        console.log('Unable to create the account');
      }
    } catch (err) {
      console.log("Something went wrong in sign-up", err);
    }
  };

  const login = async () => {
    try {
      const response = await axios.post('/api/userAuth/login', { email, password });
      console.log(response.data);
      if (response.data.success) {
        const token = response.data.token;
        const role = response.data.role;
        localStorage.setItem('token', token);
        localStorage.setItem('role',role);
        setIsLoginOpen(false);
        dispatch(logIn({ name:response.data.user.name, email }));
        navigate('/attemptQuiz');
      } else {
        setValid(false);
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={() => (setIsSignUpOpen(false), setValid(true))}>
          <div
            className="bg-white p-8 rounded-lg shadow-lg w-96 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => (setIsSignUpOpen(false), setValid(true))}
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
            {
              isSignUpOpen && valid == false ? (
                <div>
                  <p className="text-red-500">This email is already exist</p>
                </div>
              ):""
            }
          </div>
        </div>
      )}

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={() => (setIsLoginOpen(false), setValid(true))}>
          <div
            className="bg-white p-8 rounded-lg shadow-lg w-96 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => (setIsLoginOpen(false), setValid(true))}
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
            {
              isLoginOpen && valid == false ? (
                <div>
                  <p className="text-red-500">No such user exist, please signUp</p>
                </div>
              ):""
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default UserLogin;
