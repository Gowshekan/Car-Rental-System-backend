import express from 'express';
import { Car } from '../models/index.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Get all cars
router.get('/', async (req, res) => {
  try {
    const { type, status } = req.query;
    let where = {};
    
    if (type) where.type = type;
    if (status) where.status = status;

    const cars = await Car.findAll({ where });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get car by ID
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create car (Admin only)
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const car = await Car.create(req.body);
    res.status(201).json({ message: 'Car added successfully', car });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update car (Admin only)
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    await car.update(req.body);
    res.json({ message: 'Car updated successfully', car });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete car (Admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    await car.destroy();
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
