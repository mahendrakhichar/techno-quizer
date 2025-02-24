import React, { useState } from "react";
import { logIn, logout } from "../../redux/userSlice";
import {
  Layout,
  User,
  ClipboardList,
  Settings,
  BookOpen,
  LogOut,
  ChevronRight,
  Award,
  Clock,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Sample demo data
const attemptedQuizzes = [
  {
    name: "Math Quiz",
    code: "MQ001",
    marks: 80,
    date: "2024-03-10",
    duration: "45 min",
    responses: [
      { question: "2+2", answer: "4", correctAnswer: "4", isCorrect: true },
      { question: "5+3", answer: "7", correctAnswer: "8", isCorrect: false },
    ],
  },
  {
    name: "Science Quiz",
    code: "SQ001",
    marks: 75,
    date: "2024-03-08",
    duration: "30 min",
    responses: [
      {
        question: "What is water?",
        answer: "H2O",
        correctAnswer: "H2O",
        isCorrect: true,
      },
    ],
  },
];

const availableQuizzes = [
  {
    name: "History Quiz",
    description: "Test your knowledge of world history",
    difficulty: "Easy",
    duration: "30 min",
    questions: 20,
    code:"3kdf",
  },
  {
    name: "Geography Quiz",
    description: "Explore countries, capitals, and landmarks",
    difficulty: "Medium",
    duration: "45 min",
    questions: 25,
    code:"98idj",
  },
];

function UserDashboard() {
  const [activeTab, setActiveTab] = useState("attempted");
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = ()=>{
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      dispatch(logout());
      navigate('/');
  }
  const renderContent = () => {
    switch (activeTab) {
      case "attempted":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {attemptedQuizzes.map((quiz, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedQuiz(quiz)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {quiz.name}
                      </h3>
                      <p className="text-sm text-gray-500">Code: {quiz.code}</p>
                    </div>
                    <div className="flex items-center">
                      <Award className="w-5 h-5 text-indigo-500 mr-1" />
                      <span className="text-lg font-bold text-indigo-500">
                        {quiz.marks}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{quiz.duration}</span>
                    <span className="mx-2">•</span>
                    <span>{quiz.date}</span>
                  </div>
                </div>
              ))}
            </div>

            {selectedQuiz && (
              <div className="mt-8 bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">
                  {selectedQuiz.name} - Detailed Results
                </h3>
                <div className="space-y-4">
                  {selectedQuiz.responses.map((response, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg ${
                        response.isCorrect
                          ? "bg-green-50 border border-green-200"
                          : "bg-red-50 border border-red-200"
                      }`}
                    >
                      <p className="font-medium mb-2">
                        Question {index + 1}: {response.question}
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Your Answer:</p>
                          <p className="font-medium">{response.answer}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Correct Answer:</p>
                          <p className="font-medium">
                            {response.correctAnswer}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case "available":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availableQuizzes.map((quiz, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {quiz.name}
                </h3>
                <p className="text-sm text-gray-500">Code: {quiz.code}</p>
              </div>
              <p className="text-gray-600 mb-4">{quiz.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {quiz.duration}
                </span>
                <span className="flex items-center">
                  <ClipboardList className="w-4 h-4 mr-1" />
                  {quiz.questions} Questions
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium
                    ${
                      quiz.difficulty === "Easy"
                        ? "bg-green-100 text-green-800"
                        : quiz.difficulty === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                >
                  {quiz.difficulty}
                </span>
              </div>
              <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                Start Quiz
              </button>
            </div>
          ))}
        </div>
        );

      case "settings":
        return (
          <div className="bg-white rounded-lg p-6 shadow-md max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-6">Profile Settings</h3>
            <div className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        defaultValue="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        defaultValue="john@example.com"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
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
                <span className="text-xl font-bold text-gray-800">
                  QuizMaster
                </span>
              </div>
            </div>

            <div className="px-4 py-2">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="text-sm font-medium text-gray-800">
                    John Doe
                  </h3>
                  <p className="text-xs text-gray-500">john@example.com</p>
                </div>
              </div>
            </div>

            <nav className="flex-1 px-4 py-4">
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab("attempted")}
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${
                    activeTab === "attempted"
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <ClipboardList className="w-5 h-5" />
                  <span>Attempted Quizzes</span>
                </button>
                <button
                  onClick={() => setActiveTab("available")}
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${
                    activeTab === "available"
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Available Quizzes</span>
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${
                    activeTab === "settings"
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-600 hover:bg-gray-50"
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
              <h1 className="text-2xl font-bold text-gray-800">
                {activeTab === "attempted" && "Attempted Quizzes"}
                {activeTab === "available" && "Available Quizzes"}
                {activeTab === "settingconst [available]s" && "Settings"}
              </h1>
            </div>
          </header>

          <main className="px-8 py-6">{renderContent()}</main>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
