const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Synchronize Firebase Auth User with MongoDB
router.post('/sync', async (req, res) => {
  try {
    const { uid, email, name, role, phoneNumber, vehicleNumber, upiId } = req.body;
    
    let user = await User.findOne({ uid });
    
    if (!user) {
      user = new User({ 
        uid, 
        email, 
        name, 
        role: role || 'User',
        phoneNumber,
        vehicleNumber,
        upiId
      });
      await user.save();
    } else {
      // Update existing user with new details if provided
      if (phoneNumber) user.phoneNumber = phoneNumber;
      if (vehicleNumber) user.vehicleNumber = vehicleNumber;
      if (upiId) user.upiId = upiId;
      await user.save();
    }
    
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Error syncing user:', error);
    res.status(500).json({ success: false, message: error.message || 'Server Error', error: error.toString() });
  }
});

// Get User Profile
router.get('/:uid', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
