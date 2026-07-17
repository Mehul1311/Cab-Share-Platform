const express = require('express');
const Ride = require('../models/Ride');
const User = require('../models/User');
const router = express.Router();

// Create a new ride (Driver)
router.post('/create', async (req, res) => {
  try {
    const { driverUid, origin, destination, price, availableSeats } = req.body;
    
    const driver = await User.findOne({ uid: driverUid });
    if (!driver || driver.role !== 'Driver') {
      return res.status(403).json({ success: false, message: 'Unauthorized. Must be a driver.' });
    }

    const newRide = new Ride({
      driverId: driver._id,
      origin,
      destination,
      price,
      availableSeats
    });

    await newRide.save();
    res.status(201).json({ success: true, ride: newRide });
  } catch (error) {
    console.error('Error creating ride:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Get all available rides (User)
router.get('/available', async (req, res) => {
  try {
    const rides = await Ride.find({ status: 'Available', availableSeats: { $gt: 0 } }).populate('driverId', 'name email');
    res.status(200).json({ success: true, rides });
  } catch (error) {
    console.error('Error fetching rides:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Get rides for a specific driver
router.get('/driver/:driverUid', async (req, res) => {
  try {
    const { driverUid } = req.params;
    const driver = await User.findOne({ uid: driverUid });
    if (!driver) return res.status(404).json({ success: false, message: 'Driver not found' });

    const rides = await Ride.find({ driverId: driver._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, rides });
  } catch (error) {
    console.error('Error fetching driver rides:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Book a ride (User)
router.post('/book/:rideId', async (req, res) => {
  try {
    const { userUid } = req.body;
    const { rideId } = req.params;

    const user = await User.findOne({ uid: userUid });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ success: false, message: 'Ride not found' });
    if (ride.availableSeats <= 0) return res.status(400).json({ success: false, message: 'No seats available' });

    ride.passengers.push(user._id);
    ride.availableSeats -= 1;
    if (ride.availableSeats === 0) ride.status = 'Booked';
    
    await ride.save();

    res.status(200).json({ success: true, message: 'Ride booked and payment simulated successfully', ride });
  } catch (error) {
    console.error('Error booking ride:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
