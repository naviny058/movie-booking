const Booking = require('../models/booking.model')
const Show = require('../models/show.model');
const { STATUS } = require('../utills/constant');

const createBooking = async (data) => {
  try {
    console.log('ser', data);
    const show = await Show.findOne({
      movieId: data.movieId,
      theatreId: data.theatreId,
      _id: data.showId
    })
    console.log({ show });

    console.log(show.price, data.noOfSeats);
    data.totalCost = data.noOfSeats * show.price;
    const response = Booking.create(data);
    await show.save()
    return response.populate('movieId theatreId');
  } catch (error) {
    console.log(error);
    if (error.name == 'ValidationError') {
      let err = {};
      Object.keys(error.errors).forEach(key => {
        err[key] = error.errors[key].message;
      });
      throw { err: err, code: STATUS.UNPROCESSABLE_ENTITY };
    }
    throw error;
  }
}

const updateBooking = async (data, bookingId) => {
  try {
    const response = await Booking.findByIdAndUpdate(bookingId, data, { new: true, runValidators: true })
    if (!response) {
      throw {
        err: "No booking found for the given id",
        code: STATUS.NOT_FOUND
      }
    }
    return response;
  } catch (error) {
    console.log(error);
    if (error.name == 'ValidationError') {
      let err = {};
      Object.keys(error.errors).forEach(key => {
        err[key] = error.errors[key].message;
      });
      throw { err: err, code: STATUS.UNPROCESSABLE_ENTITY };
    }
    throw error;
  }
}
const getBookings = async (data) => {
  try {
    const booking = await Booking.findById(data);
    return booking;
  } catch (error) {
    throw error;
  }
}
const getAllBooking = async () => {
  try {
    const response = await Booking.find();
    return response;
  } catch (error) {
    throw error;
  }
}

const getBookingById = async (id, userId) => {
  try {
    const response = await Booking.findById(id);
    if (!response) {
      throw {
        err: "No booking found for the given id ",
        code: STATUS.NOT_FOUND
      }
    }
    if (response.userId != userId) {
      throw {
        err: "Not able to access the booking",
        code: STATUS.NOT_FOUND
      }
    }
    return response;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  createBooking,
  updateBooking,
  getBookings,
  getAllBooking,
  getBookingById,
}