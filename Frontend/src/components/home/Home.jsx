// import React, { useState } from 'react';
// import { Sparkles, BookOpen } from 'lucide-react';
// import AdminLogin from '../logins/AdminLogin';
// import UserLogin from '../logins/UserLogin';

// const Home = () => {
//   const [isAdminOpen, setIsAdminOpen] = useState(false);
//   const [isUserOpen, setIsUserOpen] = useState(false);

//   const createHandler = () => {
//     setIsAdminOpen(true);
//     setIsUserOpen(false);
//   };
  
//   const attemptHandler = () => {
//     setIsUserOpen(true);
//     setIsAdminOpen(false);
//   };

//   const closeModal = () => {
//     setIsAdminOpen(false);
//     setIsUserOpen(false);
//   };

//   return (
//     <div className="relative min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 opacity-30" style={{
//         backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f1f5f9' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
//       }}></div>

//       <div className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
//         <div className="w-full max-w-4xl mx-auto text-center space-y-12">
//           {/* Hero Section */}
//           <div className="space-y-6">
//             <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 tracking-tight">
//               Welcome to the
//               <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
//                 Quiz App
//               </span>
//             </h1>
//             <p className="text-xl sm:text-2xl text-gray-600 max-w-2xl mx-auto">
//               Create engaging quizzes or test your knowledge with our interactive platform
//             </p>
//           </div>

//           {/* Cards Container */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
//             {/* Create Quiz Card */}
//             <div className="group relative">
//               <div className="relative bg-white rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl p-6 cursor-pointer"
//                    onClick={createHandler}>
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                 <div className="relative space-y-4">
//                   <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
//                     <Sparkles className="w-6 h-6 text-blue-600" />
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-900">Create Quiz</h3>
//                   <p className="text-gray-600">Design your own quiz and challenge others</p>
//                 </div>
//               </div>
//             </div>

//             {/* Attempt Quiz Card */}
//             <div className="group relative">
//               <div className="relative bg-white rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl p-6 cursor-pointer"
//                    onClick={attemptHandler}>
//                 <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                 <div className="relative space-y-4">
//                   <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
//                     <BookOpen className="w-6 h-6 text-indigo-600" />
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-900">Attempt Quiz</h3>
//                   <p className="text-gray-600">Test your knowledge with existing quizzes</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Modals */}
//         {(isAdminOpen || isUserOpen) && (
//           <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50 p-4"
//                onClick={closeModal}>
//             <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100 opacity-100"
//                  onClick={(e) => e.stopPropagation()}>
//               <div className="p-8">
//                 {isAdminOpen && <AdminLogin />}
//                 {isUserOpen && <UserLogin />}
//                 <button
//                   onClick={closeModal}
//                   className="mt-6 w-full px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium transition-colors duration-200"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;



import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, BookOpen } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate(); // ✅ Import and use navigate

  const createHandler = () => {
    navigate('/createQuiz'); // ✅ Navigate directly
  };

  const attemptHandler = () => {
    navigate('/attemptQuiz'); // ✅ Navigate directly
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <div className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 tracking-tight">
              Welcome to the
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Quiz App
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-2xl mx-auto">
              Create engaging quizzes or test your knowledge with our interactive platform
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="group relative">
              <div className="relative bg-white rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl p-6 cursor-pointer"
                   onClick={createHandler}> 
                <div className="relative space-y-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Create Quiz</h3>
                  <p className="text-gray-600">Design your own quiz and challenge others</p>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="relative bg-white rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl p-6 cursor-pointer"
                   onClick={attemptHandler}> 
                <div className="relative space-y-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Attempt Quiz</h3>
                  <p className="text-gray-600">Test your knowledge with existing quizzes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
