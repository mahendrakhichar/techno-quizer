import { FaUserCircle, FaSignInAlt, FaUserPlus } from "react-icons/fa"; // Icons for User Circle, Sign In, and User Plus
import React, { useState } from "react";
import axios from "axios";
import { FiXCircle } from "react-icons/fi"; // Added Close Icon
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logIn,logout } from "../../redux/adminSlice";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [Error , setError] = useState(true);

  const signUpHandler = () => {
    setIsSignUpOpen(true);
    setIsLoginOpen(false);
  };

  const loginHandler = () => {
    setIsLoginOpen(true);
    setIsSignUpOpen(false);
  };

  const signup = async () => {
    try {
      const response = await axios.post('/api/adminAuth/signup', { name, email, password });
      console.log(response.data.message);
      if (response.data.success) {
        // Assuming you want to close the modal and maybe redirect after signup success.
        setIsSignUpOpen(false);
        // navigate('/createQuiz')
      } else {
        setError(false);
        console.log('Unable to create the account');
      }
    } catch (err) {
      alert("check email or password!!!")
      console.log("Something went wrong in sign-up", err);
    }
  };

  const login = async () => {
    try {
      const response = await axios.post('/api/adminAuth/login', { email, password });
  
      console.log(response.data.message);
  
      if (response.data.success) {
        const token = response.data.token;
        const role = response.data.role;
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
  
        dispatch(logIn({ name: response.data.admin.name, email }));
  
        setIsLoginOpen(false);
        navigate('/createQuiz');
        console.log(response.data.message);
      } else {
        if (response.data.message === "No such admin exists. Please register first.") {
          setError("No such admin exists. Please register first.");
        } else if (response.data.message === "Incorrect password. Please try again.") {
          setError("Incorrect password. Please try again.");
        } else {
          setError("Something went wrong, please try again.");
        }
        setError(false);
      }
    } catch (err) {
      console.error("Login error: ", err);
      setError("An unexpected error occurred. Please try again later.");
      setError(false);
    }
  };
  

  return (
    <div className="min-h-100 bg-gray-50 p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-lg text-gray-600">Create or manage quizzes for your students/teams/friends.</p>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={signUpHandler}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md flex items-center gap-2 hover:bg-blue-600 transition ease-in-out"
        >
          <FaUserPlus className="text-xl" />
          Sign Up
        </button>
        <button
          onClick={loginHandler}
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md flex items-center gap-2 hover:bg-green-600 transition ease-in-out"
        >
          <FaSignInAlt className="text-xl" />
          Login
        </button>
      </div>

      {/* Sign Up Modal */}
      {isSignUpOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={() => (setIsSignUpOpen(false), setError(true))}>
          <div
            className="bg-white p-8 rounded-lg shadow-lg w-96 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <FiXCircle
              onClick={() => (setIsSignUpOpen(false), setError(true))}
              className="absolute top-4 right-4 text-2xl text-gray-500 cursor-pointer hover:text-gray-700"
            />
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
              isSignUpOpen && Error == false ? (
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={() => (setIsLoginOpen(false), setError(true))}>
          <div
            className="bg-white p-8 rounded-lg shadow-lg w-96 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <FiXCircle
              onClick={() => (setIsLoginOpen(false), setError(true))}
              className="absolute top-4 right-4 text-2xl text-gray-500 cursor-pointer hover:text-gray-700"
            />
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
              isLoginOpen && Error == false ? (
                <div>
                  <p className="text-red-500">No such Admin exist, please signUp</p>
                </div>
              ):""
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
