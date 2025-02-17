import express from 'express'
import communicate from '../Controllers/gptController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/gpt',authMiddleware, communicate)

export default router