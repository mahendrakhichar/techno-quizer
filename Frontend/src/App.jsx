import { Routes, Route , Navigate } from 'react-router-dom';
import {useState} from 'react'
import Home from './components/home/Home';
import CreateQuiz from './components/createQuiz/CreateQuiz';
import './App.css';
import AllQuestion from './components/createQuiz/AllQuestion'
import QuizList from './components/attemptQuiz/QuizList'
import Quiz from './components/attemptQuiz/Quiz'
import QuestionsWithGpt from './components/createQuiz/QuestionsWithGpt';
import {Provider, useSelector} from 'react-redux';
import store from './redux/store';
import Profile from './components/profile/Profile';
import AdminProfile from './components/profile/AdminProfile';
// to add secuity to routes so no one can directly access the route/ prevernt unauthourized access
import PrivateRoute from './components/privateRoute/PrivateRoute';
import { Ruler } from 'lucide-react';


function App() {
  
  const { loggedIn } = useSelector((state) => state.user);
  const {loggedInAdmin} = useSelector((state)=>state.admin);

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
  const updateQuestions = (newQuestions)=>{
    setQuestions(newQuestions)
  }

  const[currQuestionInd, setCurrQuestionInd] = useState(0);
  const updateCurrQuestionInd =(newCurrQuestionInd)=>{
    setCurrQuestionInd(newCurrQuestionInd)
  }

  // create quiz(quiz name, quiz code);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  const updateName = (newName)=>{
    setName(newName)
  }
  const updateCode = (newCode)=>{
    setCode(newCode)
  }

  // private routing 
  const userType = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  return (
      <div>
        {
          userType == 'user' && (<Profile/>)
        }
        {
          userType == 'admin' && (<AdminProfile/>)
        }
        <Routes>
          {token && <Route path='/' element={<Navigate to = {userType == 'user' ? '/attemptQuiz': '/createQuiz'} />} />}
          {!token && <Route path='/' element={<Home/>}/>}
          <Route element= {<PrivateRoute/>}>
            {
              userType == 'user' && (
              <>
                <Route path = "/attemptQuiz" element={<QuizList/> }/>
                <Route path = "/quiz" element = {<Quiz/>}/>
              </>
              )}
              {
                userType == 'admin' &&(
              <>  
                <Route path="/createQuiz" element={<CreateQuiz name={name} updateName={updateName} code={code} updateCode = {updateCode}/>} />
                <Route path="/createQuiz/questions" element = {<QuestionsWithGpt questions={questions} updateQuestions= {updateQuestions} currQuestionInd={currQuestionInd} updateCurrQuestionInd={updateCurrQuestionInd}/>} />
                <Route path = "/createQuiz/Questions/AllQuestion" element= {<AllQuestion name={name} code={code}/>}  />
              </>
              )}
          </Route>

        </Routes>
      </div>
  );
}

export default App;