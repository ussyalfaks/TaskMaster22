const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// Routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://usmanalfaki01:igh4XoMLqxs7xxei@taskmaster.ef3xr.mongodb.net/?retryWrites=true&w=majority&appName=taskmaster' )
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

