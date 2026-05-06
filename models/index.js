import sequelize from '../config/database.js';
import User from './User.js';
import Car from './Car.js';
import Booking from './Booking.js';

// Sync database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ Database synced successfully');
  } catch (error) {
    console.error('❌ Database sync error:', error);
  }
};

export { sequelize, User, Car, Booking, syncDatabase };
