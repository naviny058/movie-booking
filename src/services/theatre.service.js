const Theatre = require('../models/theatre.model');
const { STATUS } = require('../utills/constant');

/**
 * 
 * @param data -> object containing details of the theatre to be created
 * @returns -> object with the new theatre details
 */
const createTheatre = async (data) => {
  try {
    const theatre = await Theatre.create(data);
    return theatre;
  } catch (error) {
    if (error.name == 'ValidationError') {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      throw { err: err, code: STATUS.UNPROCESSABLE_ENTITY }
    }
    console.log(error);
    throw err;
  }
}
const deleteTheatre = async (id) => {
  try {
    const theatre = await Theatre.findByIdAndDelete(id)
    if (!theatre) {
      throw {
        err: 'No record of a theatre found of a given id',
        code: STATUS.NOT_FOUND
      }
    }
    return theatre;
  } catch (error) {
    console.log(error)
    throw error;
  }
}
/**
 * 
 * @param id -> it is the unique _id based on which we will fetch a theatre
 */
const getTheatre = async (id) => {
  try {
    const theatre = await Theatre.findById(id)
    if (!theatre) {
      throw {
        err: 'No record of a theatre found of a given id',
        code: STATUS.NOT_FOUND
      }
    }
    return theatre;
  } catch (error) {
    console.log(error)
    throw error;
  }
}
/**
 * 
 * @param data -> the data to be used to filter out theatres based on city / pincode 
 * @returns -> returns an object with the filtered content of theatres
 */
const getAllTheatres = async (data) => {
  try {
    let query = {};
    let pagination = {};

    if (data && data.city) {
      //this check weather the city is present in query params or not
      query.city = data.city;
    }
    //this check weather the pincode is present in query params or not
    if (data && data.pincode) {
      query.pincode = data.pincode;
    }
    if (data && data.name) {
      //this check weather the name is present in query params or not
      query.name = data.name;
    }
    if (data && data.movieId) {
      //this check weather the movieId is present in query params or not
      query.movieId = { $all: data.movieId };
    }
    if (data && data.limit) {
      //this check weather the limit is present in query params or not
      query.limit = data.limit;
    }
    if (data && data.skip) {
      // for first page we skip as 0 

      let perPage = (data.limit) ? data.limit : 5;
      pagination.skip = data.skip * perPage;
    }

    const response = await Theatre.find(query, {}, pagination);
    return response;
  } catch (error) {
    console.log(error)
    throw error;
  }
}
/**
 * 
 * @param id -> the unique id to identify the theatre to be updated
 * @param data -> data object to be used to update the theatre
 * @returns -> it returns the new updated theatre object
 */
const updateTheatre = async (id, data) => {
  try {
    const response = await Theatre.findByIdAndUpdate(id, data, { new: true, runValidators: true })
    if (!response) {
      // no record for the given id
      throw {
        err: "No record found for the given id",
        code: STATUS.NOT_FOUND
      }
    }
    return response;
  } catch (error) {
    if (error.name == 'ValidationError') {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      throw { err: err, code: STATUS.UNPROCESSABLE_ENTITY }
    }
    throw error
  }
}
/**
 * 
 * @param theatreId -> unique id of the theatre for which we want to update movies
 * @param movieIds -> array of movie ids that are expected to be updated in theatre
 * @param insert -> boolean that tells whether we want insert movies or remove them
 * @returns -> updated theatre object
 */
const updateMoviesInTheatres = async (theatreId, movieIds, insert) => {
  try {
    let theatre;
    if (insert) {
      //we need to add movie
      theatre = await Theatre.findByIdAndUpdate(
        { _id: theatreId },
        { $addToSet: { movies: { $each: movieIds } } },
        { new: true }
      );
    } else {
      //we need to remove movie
      theatre = await theatre.findByIdAndUpdate(
        { _id: theatreId },
        { $pull: { movies: { $in: movieIds } } },
        { new: true }
      )
    }
    return theatre.populate('movies')
  } catch (error) {
    if (error.name == 'TypeError') {
      throw {
        code: STATUS.NOT_FOUND,
        err: 'No theatre found for the given id'
      }
    }
    console.log("Error is", error);
    throw error;
  }
}
const getMoviesInATheatre = async (id) => {
  try {
    const theatre = await Theatre.findById(id, { name: 1, movies: 1, address: 1 }).populate('movies')
    if (!theatre) {
      throw {
        err: "No Theatre with the given id found",
        code: STATUS.NOT_FOUND
      }
    }
    return theatre;
  } catch (error) {
    console.log("error is ", error)
    throw error;
  }
}
const checkMovieInATheatre = async (theatreId, movieId) => {
  try {
    const response = await Theatre.findById(theatreId)
    if (!response) {
      throw {
        err: "No such theatre found for the given id",
        code: STATUS.NOT_FOUND
      }
    }
    return response.movies.indexOf(movieId) != -1;
  } catch (error) {
    console.log(error)
    throw error;
  }
}
module.exports = {
  createTheatre,
  deleteTheatre,
  getTheatre,
  getAllTheatres,
  updateTheatre,
  updateMoviesInTheatres,
  getMoviesInATheatre,
  checkMovieInATheatre
}