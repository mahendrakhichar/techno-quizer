import express from 'express';
import { createQuiz, getQuizes, checkCode } from '../Controllers/quizController.js';
const router = express.Router();

router.post('/createQuiz',createQuiz);
router.get('/quizzesList',getQuizes);   
router.get('/checkCode/:code', checkCode) 

export default router;