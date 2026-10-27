const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  cfPaymentId: { type: String },
  rideId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true }, // Total Fare paid by rider
  driverAmount: { type: Number, required: true }, // Driver net payout
  commissionAmount: { type: Number, required: true }, // Platform commission earned
  commissionRate: { type: Number, default: 10 }, // Commission percentage applied (e.g. 10%)
  status: { type: String, enum: ['PENDING', 'SUCCESS', 'FAILED'], default: 'PENDING' },
  paymentMethod: { type: String, default: 'CASHFREE' },
  paymentSessionId: { type: String },
  rawCashfreeResponse: { type: Object },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);
