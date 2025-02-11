import express from 'express'
import communicate from '../Controllers/gptController.js';
const router = express.Router();

router.post('/gpt', communicate)

export default router