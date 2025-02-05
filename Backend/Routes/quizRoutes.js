import express from 'express';
import { createQuiz, getQuizes } from '../Controllers/quizController.js';
const router = express.Router();

router.post('/createQuiz',createQuiz);
router.get('/quizzesList',getQuizes);    

export default router;