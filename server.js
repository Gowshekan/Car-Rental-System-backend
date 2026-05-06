import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize, syncDatabase } from './models/index.js';
import authRoutes from './routes/auth.js';
import carRoutes from './routes/cars.js';
import bookingRoutes from './routes/bookings.js';
import userRoutes from './routes/users.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
sequelize.authenticate()
  .then(() => {
    console.log('✅ PostgreSQL Connected');
    syncDatabase();
  })
  .catch((err) => console.error('❌ PostgreSQL Connection Error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);

// Health Check
app.get('/', (req, res) => {
  res.json({ message: 'Car Rental API is running with PostgreSQL!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
