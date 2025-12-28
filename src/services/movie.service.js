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
/**
 * 
 * @param id -> id which will be used to indentify the movie to be deleted 
 * @returns -> object containing details of the movie deleted
 */
const deleteMovie = async (id) => {
  try {
    const response = await Movie.findByIdAndDelete(id)
    if (!response) {
      throw {
        err: "No movie record found for the id provided. ",
        code: STATUS.NOT_FOUND
      }
    }
    return response
  } catch (error) {
    console.log(error)
    throw error;
  }
}
/**
 * 
 * @param id -> id which will be used to identify the movie to be fetched
 * @returns -> object containing movie fetched
 */
const getMovie = async (id) => {
  try {
    const movie = await Movie.findById(id)
    if (!movie) {
      throw {
        err: "No movie record found for the id provided. ",
        code: STATUS.NOT_FOUND
      }
    }
    return movie
  } catch (error) {
    console.log(error)
    throw error;
  }
}
/**
 * 
 * @param id -> id which will be used to identify the movie to be updated
 * @param data -> object that contains actual data which is to be updated in the db
 * @returns -> returns the new updated movie details
 */
const updateMovie = async (id, data) => {
  try {
    const movie = await Movie.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    return movie;
  } catch (error) {
    if (error.name = 'ValidationError') {
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
const fetchMovies = async () => {
  try {
    const movies = await Movie.find();
    return movies
  } catch (error) {
    console.log(error)
    throw error;
  }
}
const filterMovies = async (filter) => {
  let query = {};
  if (filter.name) {
    query.name = {
      $regex: filter.name,   // matches anywhere
      $options: 'i'          // case-insensitive
    };
  }
  let movies = await Movie.find(query)
  if (!movies) {
    throw {
      err: 'Not able to find the queries movies ',
      code: STATUS.NOT_FOUND
    }
  }
  return movies;
}
module.exports = {
  createMovie,
  deleteMovie,
  getMovie,
  fetchMovies,
  updateMovie,
  filterMovies,
}