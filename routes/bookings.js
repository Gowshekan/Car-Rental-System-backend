import express from 'express';
import { Booking, User, Car } from '../models/index.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Get all bookings (Admin) or user bookings
router.get('/', auth, async (req, res) => {
  try {
    let bookings;
    if (req.user.role === 'admin') {
      bookings = await Booking.findAll({
        include: [
          { model: User, attributes: ['name', 'email'] },
          { model: Car, attributes: ['name', 'type'] }
        ]
      });
    } else {
      bookings = await Booking.findAll({
        where: { userId: req.user.userId },
        include: [{ model: Car, attributes: ['name', 'type', 'image', 'price'] }]
      });
    }
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get booking by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id, {
      include: [
        { model: Car },
        { model: User, attributes: ['name', 'email', 'phone'] }
      ]
    });
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (req.user.role !== 'admin' && booking.userId !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create booking
router.post('/', auth, async (req, res) => {
  try {
    const { carId, startDate, endDate, pickupLocation } = req.body;

    const car = await Car.findByPk(carId);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    if (car.status !== 'Available') {
      return res.status(400).json({ message: 'Car is not available' });
    }

    const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    const totalAmount = days * car.price;

    const booking = await Booking.create({
      userId: req.user.userId,
      carId,
      startDate,
      endDate,
      totalAmount,
      pickupLocation,
      status: 'Pending'
    });

    await car.update({ status: 'Rented' });

    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update booking status
router.put('/:id', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByPk(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (req.user.role !== 'admin' && booking.userId !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await booking.update({ status });

    if (status === 'Completed' || status === 'Cancelled') {
      const car = await Car.findByPk(booking.carId);
      await car.update({ status: 'Available' });
    }

    res.json({ message: 'Booking updated successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete booking (Admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    await booking.destroy();
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
