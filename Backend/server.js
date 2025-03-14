import express from 'express';
import cors from "cors";
import connectDB from './databse/db.js';
import quizRoutes from './Routes/quizRoutes.js';
import gptRoutes from './Routes/gptRoutes.js';
import adminAuthRoutes from './Routes/adminAuthRoutes.js'
import userAuthRoutes from './Routes/userAuthRoutes.js'
import dotenv from 'dotenv'
dotenv.config();
const app = express();
const port = 5000;


// database (mongodv) connection
connectDB();

// Middleware
// const allowedOrigins = [
//   'http://localhost:5173', 
//   'https://techno-quizer.vercel.app',
// ];

// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'POST'],
//   credentials: true
// }));
app.use(cors({
  origin: '*',  // Allow all origins for testing
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
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
//authentication routes
app.use('/adminAuth',adminAuthRoutes);
app.use('/userAuth',userAuthRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});