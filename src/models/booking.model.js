const mongoose = require('mongoose')
const { BOOKING_STATUS } = require('../utills/constant')
/**
 * Defines the schema of theatre resource to be stored in the db
 */
const bookingSchema = new mongoose.Schema({
  theatreId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Theatre',
    required: true,
  },
  movieId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Movie',
    required: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  timing: {
    type: String,
    required: true,
  },
  noOfSeats: {
    type: Number,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: [BOOKING_STATUS.processing, BOOKING_STATUS.cancelled, BOOKING_STATUS.successfull, BOOKING_STATUS.expired],
      message: "Invalid booking status "
    },
    default: BOOKING_STATUS.processing
  },
  seat: {
    type: String,
  },
}, { timestamps: true })
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;