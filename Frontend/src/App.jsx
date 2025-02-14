import { Routes, Route } from 'react-router-dom';
import {useState} from 'react'
import Home from './components/home/Home';
import CreateQuiz from './components/createQuiz/CreateQuiz';
import './App.css';
import AllQuestion from './components/createQuiz/AllQuestion'
import QuizList from './components/attemptQuiz/QuizList'
import Quiz from './components/attemptQuiz/Quiz'
import QuestionsWithGpt from './components/createQuiz/QuestionsWithGpt';


function App() {
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

  // create quiz
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  const updateName = (newName)=>{
    setName(newName)
  }
  const updateCode = (newCode)=>{
    setCode(newCode)
  }
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/createQuiz" element={<CreateQuiz name={name} updateName={updateName} code={code} updateCode = {updateCode}/>} />
      {/* <Route path="/createQuiz/questions" element = {<Questions questions={questions} updateQuestions= {updateQuestions} currQuestionInd={currQuestionInd} updateCurrQuestionInd={updateCurrQuestionInd} />} /> */}
      <Route path="/createQuiz/questions" element = {<QuestionsWithGpt questions={questions} updateQuestions= {updateQuestions} currQuestionInd={currQuestionInd} updateCurrQuestionInd={updateCurrQuestionInd}/>} />
      <Route path = "/createQuiz/Questions/AllQuestion" element= {<AllQuestion name={name} code={code}/>}  />
      <Route path = "/attemptQuiz" element={<QuizList/> }/>
      <Route path = "/quiz" element = {<Quiz/>}/>
    </Routes>
  );
}

export default App;