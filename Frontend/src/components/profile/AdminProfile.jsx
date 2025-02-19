import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { logIn, logout } from "../../redux/adminSlice";
import { useNavigate } from 'react-router-dom';

const AdminProfile = () => {
  const { admin, loggedIn } = useSelector((state) => state.admin); // Get user data from Redux store
  const [showDetails, setShowDetails] = useState(false); // State to toggle profile details

  const toggleDetails = () => setShowDetails(!showDetails); // Toggle details on click

  //logout
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler=()=>{
    localStorage.removeItem('token',);
    localStorage.removeItem('role');
    dispatch(logout());
    navigate('/');
  }
  return (
    <div className="relative">
      {/* Profile Icon */}
      <div
        onClick={toggleDetails}
        className="cursor-pointer fixed top-5 right-5 bg-gray-200 p-3 rounded-full shadow-md hover:bg-gray-300"
      >
        <FaUserCircle className="text-3xl text-gray-700" />
      </div>

      {/* Profile Details */}
      {showDetails && (
        <div className="fixed top-16 right-5 bg-white shadow-lg rounded-lg p-4 w-64">
          <div className="flex items-center gap-3">
            <FaUserCircle className="text-4xl text-gray-700" />
            <div>
              <span className="font-semibold">{admin?.name || 'Name'}</span>
              <p className="text-sm text-gray-600">{admin?.email || 'Email'}</p>
            </div>
            <button
            onClick={logoutHandler}
            className="mt-4 w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
