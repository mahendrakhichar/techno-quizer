import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Home from './components/home/Home';
import CreateQuiz from './components/createQuiz/CreateQuiz';
import './App.css';
import AllQuestion from './components/createQuiz/AllQuestion';
import QuizList from './components/attemptQuiz/QuizList';
import Quiz from './components/attemptQuiz/Quiz';
import QuestionsWithGpt from './components/createQuiz/QuestionsWithGpt';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import Profile from './components/profile/Profile';
import AdminProfile from './components/profile/AdminProfile';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import { Ruler, User } from 'lucide-react';
import UserDashboard from './components/dashboard/UserDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import Questions from './components/createQuiz/Questions';

function App() {
  const { loggedIn } = useSelector((state) => state.user);
  const { loggedInAdmin } = useSelector((state) => state.admin);

  const [questions, setQuestions] = useState([
    {
      question: '',
      a: '',
      b: '',
      c: '',
      d: '',
      rightAnswer: '', // add this to store the correct answer if needed
    },
  ]);
  const updateQuestions = (newQuestions) => {
    setQuestions(newQuestions);
  };

  const [currQuestionInd, setCurrQuestionInd] = useState(0);
  const updateCurrQuestionInd = (newCurrQuestionInd) => {
    setCurrQuestionInd(newCurrQuestionInd);
  };

  // create quiz(quiz name, quiz code);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  const updateName = (newName) => {
    setName(newName);
  };
  const updateCode = (newCode) => {
    setCode(newCode);
  };

  // private routing 
  const userType = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  return (
    <div>
      {/* <Routes>
        {!token && (
          <>
            <Route path='/' element={<Home />} />
            <Route path='/*' element={<Home />} />
          </>
        )}
        <Route element={<PrivateRoute/>}>
          {
            userType != 'admin' ? (<>
              <Route path='/' element={<Navigate to = "/UserDashboard" />}/>
              <Route path='/UserDashboard' element={<UserDashboard />} />
              <Route path='/attemptQuiz' element={<QuizList />} />
              <Route path='/quiz' element={<Quiz />} />
            </>):(<>
                <Route path='/' element={<Navigate to = "/AdminDashboard" />}/>
                <Route path='/AdminDashboard' element={<AdminDashboard />} />
                <Route path='/createQuiz' element={<CreateQuiz name={name} updateName={updateName} code={code} updateCode={updateCode} />} />
                <Route path='/createQuiz/questions' element={<QuestionsWithGpt questions={questions} updateQuestions={updateQuestions} currQuestionInd={currQuestionInd} updateCurrQuestionInd={updateCurrQuestionInd} />} />
                <Route path='/createQuiz/Questions/AllQuestion' element={<AllQuestion name={name} code={code} />} />
            </>)
          }
        </Route>
      </Routes> */}


      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/UserDashboard' element={<UserDashboard />} />
        <Route path='/attemptQuiz' element={<QuizList />} />
        <Route path='/quiz' element={<Quiz />} />
        {/* <Route path='/test' element={<Questions questions={questions} updateQuestions={updateQuestions} currQuestionInd={currQuestionInd} updateCurrQuestionInd={updateCurrQuestionInd} />} /> */}

        <Route path='/AdminDashboard' element={<AdminDashboard />} />
        <Route path='/createQuiz' element={<CreateQuiz name={name} updateName={updateName} code={code} updateCode={updateCode} />} />
        <Route path='/createQuiz/questions' element={<QuestionsWithGpt questions={questions} updateQuestions={updateQuestions} currQuestionInd={currQuestionInd} updateCurrQuestionInd={updateCurrQuestionInd} />} />
        <Route path='/createQuiz/Questions/AllQuestion' element={<AllQuestion name={name} code={code} />} />

      </Routes>
    </div>
  );
}

export default App;
