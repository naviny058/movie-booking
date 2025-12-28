/**
 * This object will be used as a template for building error responses
 */
const errorResponseBody = {
  err: {},
  data: {},
  message: 'Something went wrong, cannot process the requrest ',
  success: false
}
/**
 * This object will be used as a template for building success responses
 */
const successResponseBody = {
  err: {},
  data: {},
  message: 'Sucessfully processed the requrest ',
  success: true
}
module.exports = {
  successResponseBody,
  errorResponseBody
}
