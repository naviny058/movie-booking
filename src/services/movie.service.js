const Movie = require('../models/movie.model')
const { STATUS } = require('../utills/constant')


/**
 * 
 * @param data -> object containing details of the new movie to be created
 * @returns -> returns the new movie object created
 */
const createMovie = async (data) => {
  try {
    const movie = await Movie.create(data);
    return movie
  } catch (error) {
    if (error.name == 'ValidationError') {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      console.log(err);
      throw { err: err, code: STATUS.UNPROCESSABLE_ENTITY }
    } else {
      throw error;
    }
  }
}
module.exports = {
  createMovie,
}