import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Car = sequelize.define('Car', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('Hatchback', 'Sedan', 'SUV', 'Luxury'),
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  seats: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  transmission: {
    type: DataTypes.ENUM('Manual', 'Auto'),
    allowNull: false
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  plateNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  status: {
    type: DataTypes.ENUM('Available', 'Rented', 'Maintenance'),
    defaultValue: 'Available'
  },
  rating: {
    type: DataTypes.DECIMAL(2, 1),
    defaultValue: 4.5
  }
}, {
  tableName: 'cars',
  timestamps: true
});

export default Car;
