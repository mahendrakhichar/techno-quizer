import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";

const app = express();
const port = 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow frontend dev server
  methods: ['GET', 'POST'], // Allowed methods
  credentials: true // Allow credentials
}));
app.use(express.json());

// In-memory storage (temporary)
let quizzes = [];

// Routes
app.post('/createQuiz', (req, res) => {
  try {
    const quizData = req.body;
    if (!quizData) {
      return res.status(400).json({ message: 'No quiz data provided' });
    }
    
    // Add quiz to storage
    quizzes.push(quizData);
    console.log('Quiz created:', quizData);
    
    res.status(201).json({ 
      message: 'Quiz created successfully',
      quiz: quizData 
    });
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/quizes', (req, res) => {
  try {
    res.status(200).json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});