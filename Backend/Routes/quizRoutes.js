import express from 'express';
import { createQuiz, getQuizes, checkCode } from '../Controllers/quizController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/createQuiz',authMiddleware, createQuiz);
router.get('/quizzesList',getQuizes);   
router.get('/checkCode/:code', checkCode) 

export default router;