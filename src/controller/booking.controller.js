const bookingService = require('../services/booking.service')
const { errorResponseBody, successResponseBody } = require('../utills/responsebody')
const { STATUS } = require('../utills/constant')

const createBooking = async (req, res) => {
  try {
    let userId = req.user;
    const booking = await bookingService.createBooking({ ...req.body, userId: userId })
    successResponseBody.message = 'Successfully created booking';
    successResponseBody.data = booking;
    return res.status(STATUS.CREATED).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}

const updateBooking = async (req, res) => {
  try {
    const response = await bookingService.updateBooking(req.body, req.params.id);
    successResponseBody.data = response;
    successResponseBody.message = "Successfully updated the booking "
    return res.status(STATUS.OK).json(successResponseBody)
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}
const getBookings = async (req, res) => {
  try {
    const response = await bookingService.getBookings({ userId: req.user });
    successResponseBody.data = response;
    successResponseBody.message = "Successfully fetch the booking "
    return res.status(STATUS.OK).json(successResponseBody)
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}
const getAllBooking = async (req, res) => {
  try {
    const response = await bookingService.getAllBooking();
    successResponseBody.data = response;
    successResponseBody.message = "Successfully fetch the booking "
    return res.status(STATUS.OK).json(successResponseBody)
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}
const getBookingById = async (req, res) => {
  try {
    const response = await bookingService.getBookingById({ id: req.params.id, userId: req.user });
    successResponseBody.data = response;
    successResponseBody.message = "Successfully fetch the booking "
    return res.status(STATUS.OK).json(successResponseBody)
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}

module.exports = {
  createBooking,
  updateBooking,
  getBookings,
  getAllBooking,
  getBookingById,
}