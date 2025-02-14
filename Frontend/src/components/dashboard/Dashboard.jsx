import { FaUserCircle, FaCog } from "react-icons/fa"; // Example icons from React Lucid icons
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";


const Dashboard = () => {

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Flex container to hold both dashboards */}
      <div className="flex justify-between space-x-4">
        {/* Admin Dashboard */}
        <div className="w-full md:w-1/2 bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <FaCog className="text-blue-500 text-3xl mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
          </div>
          <AdminDashboard />
        </div>

        {/* User Dashboard */}
        <div className="w-full md:w-1/2 bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <FaUserCircle className="text-green-500 text-3xl mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">User Dashboard</h2>
          </div>
          <UserDashboard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
