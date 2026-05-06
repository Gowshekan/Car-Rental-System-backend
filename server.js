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

// Seed Database Endpoint
app.get('/api/seed', async (req, res) => {
  try {
    const { Car } = await import('./models/index.js');
    
    const existingCars = await Car.count();
    if (existingCars > 0) {
      return res.json({ message: 'Database already seeded!', count: existingCars });
    }

    const indianCars = [
      { name: 'Maruti Swift', type: 'Hatchback', price: 1200, seats: 5, transmission: 'Manual', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800', plateNumber: 'MH-01-AB-1234', status: 'Available', rating: 4.8 },
      { name: 'Hyundai i20', type: 'Hatchback', price: 1400, seats: 5, transmission: 'Auto', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800', plateNumber: 'DL-02-CD-5678', status: 'Available', rating: 4.7 },
      { name: 'Honda City', type: 'Sedan', price: 1800, seats: 5, transmission: 'Auto', image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800', plateNumber: 'KA-03-EF-9012', status: 'Available', rating: 4.7 },
      { name: 'Hyundai Verna', type: 'Sedan', price: 2000, seats: 5, transmission: 'Auto', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800', plateNumber: 'TN-04-GH-3456', status: 'Available', rating: 4.8 },
      { name: 'Hyundai Creta', type: 'SUV', price: 2500, seats: 5, transmission: 'Auto', image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800', plateNumber: 'MH-05-IJ-7890', status: 'Available', rating: 4.9 },
      { name: 'Mahindra Thar', type: 'SUV', price: 3000, seats: 4, transmission: 'Manual', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800', plateNumber: 'RJ-06-KL-2345', status: 'Available', rating: 4.9 },
      { name: 'Kia Seltos', type: 'SUV', price: 2800, seats: 5, transmission: 'Auto', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800', plateNumber: 'GJ-07-MN-6789', status: 'Available', rating: 4.8 },
      { name: 'Toyota Fortuner', type: 'Luxury', price: 4500, seats: 7, transmission: 'Auto', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800', plateNumber: 'UP-08-OP-0123', status: 'Available', rating: 5.0 },
      { name: 'Mercedes E-Class', type: 'Luxury', price: 8000, seats: 5, transmission: 'Auto', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800', plateNumber: 'DL-09-QR-4567', status: 'Available', rating: 5.0 }
    ];

    await Car.bulkCreate(indianCars);
    res.json({ message: '✅ 9 Indian cars added successfully!', count: 9 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
