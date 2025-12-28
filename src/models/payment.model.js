const mongoose = require('mongoose')
const { PAYMENT_STATUS } = require('../utills/constant')

const paymentSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.ObjectId,
    ref: "Booking",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: [PAYMENT_STATUS.pending, PAYMENT_STATUS.failed, PAYMENT_STATUS.success],
      message: "Invalid payment status"
    },
    default: PAYMENT_STATUS.pending
  }
}, { timestamps: true })
const Payment = mongoose.model('Payment', paymentSchema)
module.exports = Payment