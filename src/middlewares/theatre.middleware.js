const badRequestResponse = {
  success: false,
  err: "",
  data: {},
  message: "Malformed reques | Bad Request"
}
const { errorResponseBody } = require('../utills/responsebody')
const { STATUS } = require('../utills/constant')

/**
 * 
 * @param req -> HTTP request object
 * @param {*} res -> HTTP response object
 * @param {*} next -> next middleware function
 * @returns -> whether the request is valid or not
 */
const validateTheatreCreateRequest = async (req, res, next) => {
  //validate the presence of name
  if (!req.body.name) {
    badRequestResponse.message = 'name of the Theatre is not present in the request'
    return res.status(STATUS.BAD_REQUEST).json(badRequestResponse)
  }
  //validate the presence of city
  if (!req.body.city) {
    badRequestResponse.message = 'city of the Theatre is not present in the request'
    return res.status(STATUS.BAD_REQUEST).json(badRequestResponse)
  }
  //validate the presence of pincode
  if (!req.body.pincode) {
    badRequestResponse.message = 'pincode of the Theatre is not present in the request'
    return res.status(STATUS.BAD_REQUEST).json(badRequestResponse)
  }
  //validate the presence of owner
  // if (!req.body.owner ||
  //   !(req.body.owner instanceof Array) ||
  //   (req.body.owner.length <= 0
  //   )) {
  //   badRequestResponse.message = 'owner of the Theatre is not present in the request'
  //   return res.status(STATUS.BAD_REQUEST).json(badRequestResponse)
  // }
  next()
}

const validateUpdateMoviesRequest = async (req, res, next) => {
  // validattion of insert parameter
  if (req.body.insert == undefined) {
    errorResponseBody.err = "The insert parameter is missing in the request";
    return res.status(400).json(errorResponseBody);
  }
  // validate movieIds presence
  if (!req.body.movieIds) {
    errorResponseBody.err = "No movies present in the request to be updated in theatre";
    return res.status(400).json(errorResponseBody);
  }
  // validate if movieIds is an array or not
  if (!(req.body.movieIds instanceof Array)) {
    errorResponseBody.err = "Expected array of movies but found something else";
    return res.status(400).json(errorResponseBody);
  }
  // validate if movieIds is empty or not
  if (req.body.movieIds.length == 0) {
    errorResponseBody.err = "No movies present in the array provided";
    return res.status(400).json(errorResponseBody);
  }
  // everything is fine
  next();
}
module.exports = {
  validateTheatreCreateRequest,
  validateUpdateMoviesRequest,
}