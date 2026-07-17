const express = require('express');
const User = require('../models/User');
const Ride = require('../models/Ride');
const router = express.Router();

// Middleware to check for Admin role
const verifyAdmin = async (req, res, next) => {
  try {
    const adminUid = req.headers['x-admin-uid'];
    if (!adminUid) return res.status(401).json({ success: false, message: 'Admin UID required' });

    const admin = await User.findOne({ uid: adminUid });
    if (!admin || admin.role !== 'Admin') {
      return res.status(403).json({ success: false, message: 'Forbidden: Admin access required' });
    }
    next();
  } catch (error) {
    console.error('Auth Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Apply middleware to all admin routes
router.use(verifyAdmin);

// GET all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// ADD a new user (manually onboarding a driver/rider for demo)
router.post('/users/add', async (req, res) => {
  try {
    const { name, email, role } = req.body;
    
    // Check if email exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    const newUser = new User({
      uid: 'admin_created_' + Date.now(), // Simulated UID for manual creation
      name,
      email,
      role
    });

    await newUser.save();
    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// UPDATE a user's details
router.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role } = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, { name, role }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// DELETE a user
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // If deleting a driver, delete their rides as well
    if (user.role === 'Driver') {
      await Ride.deleteMany({ driverId: user._id });
    }

    // Delete the user
    await User.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
