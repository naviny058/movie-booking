const TheatreService = require('../services/theatre.service');
const { STATUS } = require('../utills/constant');
const { successResponseBody, errorResponseBody } = require('../utills/responsebody')

const createTheatre = async (req, res) => {
  try {
    const theatre = await TheatreService.createTheatre({ ...req.body, owner: req.user });
    successResponseBody.data = theatre;
    successResponseBody.message = 'Successfully created the theatre';

    return res
      .status(STATUS.OK)
      .json(successResponseBody)
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res.status(STATUS.INTERNAL_SERVER_ERROR)
      .json(errorResponseBody)
  }
}
const getAllTheatres = async (req, res) => {
  try {
    const response = await TheatreService.getAllTheatres(req.params)
    successResponseBody.data = response;
    successResponseBody.message = 'Successfully fetch all theatres'
    return res
      .status(STATUS.OK)
      .json(successResponseBody)
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res.status(STATUS.INTERNAL_SERVER_ERROR)
      .json(errorResponseBody)
  }
}
const updateTheatre = async (req, res) => {
  try {
    // return res.json({ body: req.body, id: req.params.id })
    const response = await TheatreService.updateTheatre(req.params.id, req.body)
    successResponseBody.data = response;

    return res
      .status(STATUS.OK)
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
const deleteTheatre = async (req, res) => {
  try {
    // return res.json({ body: req.body, id: req.params.id })
    const response = await TheatreService.deleteTheatre(req.body.id)
    successResponseBody.data = response;
    return res
      .status(STATUS.OK)
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

const updateMovies = async (req, res) => {
  try {
    const response = await TheatreService.updateMoviesInTheatres(
      req.params.id,
      req.body.movieIds,
      req.body.insert
    );
    successResponseBody.data = response;
    successResponseBody.message = "Successfully updated movie in theatre ";
    console.log(successResponseBody);
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}
const getMovies = async (req, res) => {
  try {
    const response = await TheatreService.getMoviesInATheatre(
      req.params.id
    );
    successResponseBody.data = response;
    successResponseBody.message = "Successfully fetch movie for the theatre ";
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}
const checkMovies = async (req, res) => {
  try {
    const response = await TheatreService.checkMovieInATheatre(
      req.params.id,
      req.body.movieIds,
    );
    successResponseBody.data = response;
    successResponseBody.message = "Successfully updated movie in theatre ";
    return res.status(STATUS.OK).json(successResponseBody);
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
  createTheatre,
  getAllTheatres,
  updateTheatre,
  deleteTheatre,
  updateMovies,
  getMovies,
  checkMovies,
}