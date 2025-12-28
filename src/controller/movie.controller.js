const MovieService = require('../services/movie.service')
const { errorResponseBody, successResponseBody } = require('../utills/responsebody')
const { STATUS } = require('../utills/constant')
const createMovie = async (req, res) => {

  try {
    const respond = await MovieService.createMovie(req.body);
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
const deleteMovie = async (req, res) => {
  try {
    const response = await MovieService.deleteMovie(req.params.id)
    successResponseBody.data = response;
    successResponseBody.message = 'Successfully deleted the movie'
    return res
      .status(STATUS.OK)
      .json(successResponseBody)
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody)
    }
    errorResponseBody.err = error.err;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
  }
}
const getMovie = async (req, res) => {
  try {
    const movie = await MovieService.getMovie(req.params.id);
    successResponseBody.data = movie;
    return res
      .status(STATUS.OK)
      .json(successResponseBody)
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody)
    }
    errorResponseBody.err = error.err;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
  }
}
const fetchMovies = async (req, res) => {
  try {
    const movies = await MovieService.fetchMovies();
    successResponseBody.data = movies;
    return res
      .status(STATUS.OK)
      .json(successResponseBody)
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody)
    }
    errorResponseBody.err = error.err;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
  }
}
const updateMovie = async (req, res) => {
  try {
    const response = await MovieService.updateMovie(req.params.id, req.body);
    successResponseBody.data = response;
    return res
      .status(STATUS.OK)
      .json(successResponseBody);
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
const filterMovies = async (req, res) => {
  const query = req.query;
  const movies = await MovieService.filterMovies(query)
  successResponseBody.data = movies;
  return res
    .status(STATUS.OK)
    .json(successResponseBody)
}
module.exports = {
  createMovie,
  deleteMovie,
  getMovie,
  fetchMovies,
  updateMovie,
  filterMovies,
}