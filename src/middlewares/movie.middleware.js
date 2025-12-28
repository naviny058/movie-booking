const badRequestResponse = {
  success: false,
  err: "",
  data: {},
  message: "Malformed reques | Bad Request"
}
const { STATUS } = require('../utills/constant')

/**
 * 
 * @param req -> HTTP request object
 * @param {*} res -> HTTP response object
 * @param {*} next -> next middleware function
 * @returns -> whether the request is valid or not
 */

const validateCreateMovieRequest = async (req, res) => {
  // validate movie name 
  if (!req.body.name) {
    badRequestResponse.err = 'name of the movie is not present in the request '
    return res
      .status(STATUS.BAD_REQUEST)
      .json(badRequestResponse)
  }
  // validate movie description 
  if (!req.body.description) {
    badRequestResponse.err = 'description of the movie is not present in the request '
    return res
      .status(STATUS.BAD_REQUEST)
      .json(badRequestResponse)
  }
  // validate movie casts 
  if (!req.body.casts
    || !(req.body.casts instanceof Array)
    || (req.body.casts.length <= 0)) {
    badRequestResponse.err = 'cast of the movie is not present in the request '
    return res
      .status(STATUS.BAD_REQUEST)
      .json(badRequestResponse)
  }
  // validate movie trailerUrl 
  if (!req.body.trailerUrl) {
    badRequestResponse.err = 'trailerUrl of the movie is not present in the request '
    return res
      .status(STATUS.BAD_REQUEST)
      .json(badRequestResponse)
  }
  // validate movie language 
  if (!req.body.language) {
    badRequestResponse.err = 'language of the movie is not present in the request '
    return res
      .status(STATUS.BAD_REQUEST)
      .json(badRequestResponse)
  }
  // validate movie director 
  if (!req.body.director) {
    badRequestResponse.err = 'director of the movie is not present in the request '
    return res
      .status(STATUS.BAD_REQUEST)
      .json(badRequestResponse)
  }
  // validate movie releaseDate 
  if (!req.body.releaseDate) {
    badRequestResponse.err = 'releaseDate of the movie is not present in the request '
    return res
      .status(STATUS.BAD_REQUEST)
      .json(badRequestResponse)
  }
  // validate movie releaseStatus 
  if (!req.body.director) {
    badRequestResponse.err = 'releaseStatus of the movie is not present in the request '
    return res
      .status(STATUS.BAD_REQUEST)
      .json(badRequestResponse)
  }
  // validate movie poster 
  if (!req.body.poster) {
    badRequestResponse.err = 'poster of the movie is not present in the request '
    return res
      .status(STATUS.BAD_REQUEST)
      .json(badRequestResponse)
  }
  next()
}

module.exports = { validateCreateMovieRequest }
