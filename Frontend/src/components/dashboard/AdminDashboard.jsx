import React, { useState } from 'react';
import {
  Layout,
  PlusCircle,
  ClipboardList,
  Settings,
  LogOut,
  Users,
  Award,
  Clock,
  ChevronRight,
  BookOpen,
  Layers,
  TrendingUp,
  User
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logIn, logout } from "../../redux/userSlice";

// Sample demo data
const createdQuizzes = [
  {
    id: "1",
    name: "Advanced Mathematics",
    section: "Mathematics",
    totalStudents: 45,
    averageMarks: 76.5,
    date: "2024-03-01",
    duration: "60 min",
    questions: 20,
    topPerformers: [
      { name: "Alice Johnson", marks: 95 },
      { name: "Bob Smith", marks: 92 },
      { name: "Carol White", marks: 90 }
    ],
    students: [
      { name: "Alice Johnson", marks: 95, email: "alice@example.com", completionTime: "54 min" },
      { name: "Bob Smith", marks: 92, email: "bob@example.com", completionTime: "48 min" },
      { name: "Carol White", marks: 90, email: "carol@example.com", completionTime: "55 min" },
      { name: "David Brown", marks: 85, email: "david@example.com", completionTime: "59 min" },
      { name: "Eve Wilson", marks: 82, email: "eve@example.com", completionTime: "45 min" }
    ]
  },
  {
    id: "2",
    name: "Physics Fundamentals",
    section: "Physics",
    totalStudents: 38,
    averageMarks: 72.8,
    date: "2024-03-05",
    duration: "45 min",
    questions: 15,
    topPerformers: [
      { name: "Frank Miller", marks: 88 },
      { name: "Grace Davis", marks: 85 },
      { name: "Henry Wilson", marks: 83 }
    ],
    students: [
      { name: "Frank Miller", marks: 88, email: "frank@example.com", completionTime: "42 min" },
      { name: "Grace Davis", marks: 85, email: "grace@example.com", completionTime: "40 min" },
      { name: "Henry Wilson", marks: 83, email: "henry@example.com", completionTime: "43 min" },
      { name: "Ivy Clark", marks: 78, email: "ivy@example.com", completionTime: "44 min" },
      { name: "Jack Thompson", marks: 75, email: "jack@example.com", completionTime: "45 min" }
    ]
  }
];

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('quizzes');
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showQuizDetails, setShowQuizDetails] = useState(false);
  // const [showCreateQuiz, setShowCreateQuiz] = useState(false);

  const navigate = useNavigate();
  const createQuiz = ()=>{
    navigate('/createQuiz');
  }
  const dispatch = useDispatch();
  const logoutHandler = ()=>{
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      dispatch(logout());
      navigate('/');
  }
  const renderQuizList = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Created Quizzes</h2>
        <button
          onClick={createQuiz}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Create New Quiz
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {createdQuizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => {
              setSelectedQuiz(quiz);
              setShowQuizDetails(false);
            }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{quiz.name}</h3>
                <p className="text-sm text-gray-500">Section: {quiz.section}</p>
              </div>
              <div className="flex items-center">
                <Award className="w-5 h-5 text-indigo-500 mr-1" />
                <span className="text-lg font-bold text-indigo-500">{quiz.averageMarks}%</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-1" />
                <span>{quiz.totalStudents} Students</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-1" />
                <span>{quiz.duration}</span>
              </div>
            </div>
            <div className="border-t pt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Top Performers:</p>
              <div className="space-y-2">
                {quiz.topPerformers.slice(0, 3).map((performer, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{performer.name}</span>
                    <span className="font-medium text-indigo-600">{performer.marks}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderQuizDetails = () => {
    if (!selectedQuiz) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setSelectedQuiz(null)}
            className="text-gray-600 hover:text-gray-800 flex items-center"
          >
            <ChevronRight className="w-5 h-5 transform rotate-180" />
            <span>Back to Quizzes</span>
          </button>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{selectedQuiz.name}</h2>
              <p className="text-gray-600">Section: {selectedQuiz.section}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Edit Quiz
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Download Results
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Students</span>
                <Users className="w-5 h-5 text-indigo-600" />
              </div>
              <p className="text-2xl font-bold text-indigo-600 mt-2">{selectedQuiz.totalStudents}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Average Score</span>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-600 mt-2">{selectedQuiz.averageMarks}%</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Questions</span>
                <Layers className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-purple-600 mt-2">{selectedQuiz.questions}</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Marks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completion Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedQuiz.students.map((student, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="w-6 h-6 text-gray-500" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        {student.marks}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.completionTime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (selectedQuiz) {
      return renderQuizDetails();
    }
    return renderQuizList();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white h-screen shadow-lg fixed">
          <div className="flex flex-col h-full">
            <div className="p-6">
              <div className="flex items-center space-x-3">
                <Layout className="w-8 h-8 text-indigo-600" />
                <span className="text-xl font-bold text-gray-800">QuizMaster</span>
              </div>
            </div>

            <div className="px-4 py-2">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Admin"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="text-sm font-medium text-gray-800">Admin User</h3>
                  <p className="text-xs text-gray-500">admin@quizmaster.com</p>
                </div>
              </div>
            </div>

            <nav className="flex-1 px-4 py-4">
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setActiveTab('quizzes');
                    setSelectedQuiz(null);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${
                    activeTab === 'quizzes' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <ClipboardList className="w-5 h-5" />
                  <span>Quizzes</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${
                    activeTab === 'settings' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </button>
              </div>
            </nav>

            <div className="p-4 mt-auto">
              <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={logoutHandler}>
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64">
          <header className="bg-white shadow-sm">
            <div className="px-8 py-6">
            </div>
          </header>

          <main className="px-8 py-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;