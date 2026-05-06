import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Car from './Car.js';

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  carId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Car,
      key: 'id'
    }
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  totalAmount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Active', 'Completed', 'Cancelled'),
    defaultValue: 'Pending'
  },
  pickupLocation: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'bookings',
  timestamps: true
});

// Define associations
User.hasMany(Booking, { foreignKey: 'userId' });
Booking.belongsTo(User, { foreignKey: 'userId' });

Car.hasMany(Booking, { foreignKey: 'carId' });
Booking.belongsTo(Car, { foreignKey: 'carId' });

export default Booking;
