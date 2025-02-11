import express from 'express';
import cors from "cors";
import connectDB from './databse/db.js';
import quizRoutes from './Routes/quizRoutes.js';
import gptRoutes from './Routes/gptRoutes.js';
import dotenv from 'dotenv'
dotenv.config();
const app = express();
const port = 5000;


// database (mongodv) connection
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow frontend dev server
  methods: ['GET', 'POST'], // Allowed methods
  credentials: true // Allow credentials
}));
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});


// Routes
app.use('/quizzes', quizRoutes);
app.use('/userQuestion', gptRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});