import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';
import cookieParser from 'cookie-parser';


dotenv.config();

const app = express();
app.get('/', (req, res) => {
  res.send('App is running');
});
app.use(cors({
  origin: [
    'https://task-master22.vercel.app',
    'https://task-master22-6ru52ox0r-ussyalfaks-projects.vercel.app',
    'https://task-master22-6ru52ox0r-ussyalfaks-projects.vercel.app',

  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
}));
app.options('*', cors());
app.use(express.json());
app.use(cookieParser());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://usmanalfaks:NLtJ%23FkN59cmpBx@taskmaster.dt1dx.mongodb.net/?retryWrites=true&w=majority&appName=TaskMaster' )
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});