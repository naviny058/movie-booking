const MovieController = require('../services/movie.service')
const { errorResponseBody, successResponseBody } = require('../utills/responsebody')
const { STATUS } = require('../utills/constant')
const createMovie = async (req, res) => {

  try {
    const respond = await MovieController.createMovie(req.body);
    successResponseBody.data = respond;
    return res
      .status(STATUS.CREATED)
      .json(successResponseBody)
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res
        .status(error.code)
        .json(errorResponseBody)
    }
    errorResponseBody.err = error;
    return res
      .status(STATUS.INTERNAL_SERVER_ERROR)
      .json(errorResponseBody)
  }
}
module.exports = {
  createMovie
}