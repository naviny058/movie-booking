const ObjectId = require('mongoose').Types.ObjectId;
const { errorResponseBody } = require('../utills/responsebody')
const theatreServices = require('../services/theatre.service')
const userServices = require('../services/user.service')

const { STATUS } = require('../utills/constant')

const validateBookingRequest = async (req, res, next) => {
  if (!req.body.theatreId) {
    errorResponseBody.err = 'No theatreId provided ';
    return res
      .status(STATUS.BAD_REQUEST)
      .json(errorResponseBody)
  }
  if (!ObjectId.isValid(req.body.theatreId)) {
    errorResponseBody.err = 'Invalid theatreId provided ';
    return res
      .status(STATUS.BAD_REQUEST)
      .json(errorResponseBody)
  }
  let theatre = await theatreServices.getTheatre(req.body.theatreId)
  if (!theatre) {
    errorResponseBody.message = 'No theatre found for the given id '
    return res.status(STATUS.NOT_FOUND).json(errorResponseBody)
  }
  if (!req.body.movieId) {
    errorResponseBody.err = 'No movieId provided ';
    return res
      .status(STATUS.BAD_REQUEST)
      .json(errorResponseBody)
  }
  if (!ObjectId.isValid(req.body.movieId)) {
    errorResponseBody.err = 'Invalid movieId provided ';
    return res
      .status(STATUS.BAD_REQUEST)
      .json(errorResponseBody)
  }
  // validate if movie is running in the theatre or not ? 
  console.log(theatre.movies.indexOf(req.body.movieId), req.body.movieId);
  if (theatre.movies.indexOf(req.body.movieId) == -1) {
    errorResponseBody.err = 'Given movie is not available in the request theatre '
    return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
  }

  if (!req.body.noOfSeats) {
    errorResponseBody.message = "No seat provided ";
    return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
  }
  next();
}
const canChangeStatus = async (req, res, next) => {
  const user = userServices.getUserById(req.user);
  if (user.userRole == USER_ROLE.customer && req.body.status && req.body.status != BOOKING_STATUS.cancelled) {
    errorResponseBody.err = "You are not allowed to change the booking status";
    return res.status(STATUS.UNAUTHORISED).json(errorResponseBody);
  }
  next();
}
module.exports = {
  validateBookingRequest,
  canChangeStatus,
}