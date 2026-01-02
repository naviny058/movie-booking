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
module.exports = {
  validateTheatreCreateRequest
}