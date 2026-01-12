const { errorResponseBody } = require('../utills/responsebody')
const { STATUS, USER_ROLE } = require('../utills/constant')
const userServices = require('../services/user.service')

const jwt = require('jsonwebtoken')
const validateRegisterRequest = (req, res, next) => {
  if (!req.body.name) {
    errorResponseBody.err = "name is not present in request"
    return res
      .status(STATUS.BAD_REQUEST)
      .json(errorResponseBody)
  }
  if (!req.body.email) {
    errorResponseBody.err = "email is not present in request"
    return res
      .status(STATUS.BAD_REQUEST)
      .json(errorResponseBody)
  }
  if (!req.body.name) {
    errorResponseBody.err = "password is not present in request"
    return res
      .status(STATUS.BAD_REQUEST)
      .json(errorResponseBody)
  }
  next()
}
const validateSignInRequest = (req, res, next) => {
  if (!req.body.email) {
    errorResponseBody.err = "email is not present in request"
    return res
      .status(STATUS.BAD_REQUEST)
      .json(errorResponseBody)
  }
  if (!req.body.password) {
    errorResponseBody.err = "password is not present in request"
    return res
      .status(STATUS.BAD_REQUEST)
      .json(errorResponseBody)
  }
  next()
}
const isAuthenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      errorResponseBody.err = "No token provided"
      return res
        .status(STATUS.BAD_REQUEST)
        .json(errorResponseBody)
    }
    const response = jwt.verify(token, process.env.AUTH_KEY)
    if (!response) {
      errorResponseBody.err = "Token not verified"
      return res
        .status(STATUS.UNAUTHORISED)
        .json(errorResponseBody)
    }
    const user = await userServices.getUserById(response.id);
    req.user = user.id
    next()
  } catch (error) {
    if (error.name == "JsonWebTokenError") {
      errorResponseBody.err = error.message;
      return res.status(STATUS.UNAUTHORISED).json(errorResponseBody);
    }
    if (error.code == STATUS.NOT_FOUND) {
      errorResponseBody.err = "User doesn't exist"
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}
const validateResetPassword = (req, res, next) => {
  if (!req.body.oldPassword) {
    errorResponseBody.err = "oldPassword is not present in request"
    return res
      .status(STATUS.BAD_REQUEST)
      .json(errorResponseBody)
  }
  if (!req.body.newPassword) {
    errorResponseBody.err = "new password is not present in request"
    return res
      .status(STATUS.BAD_REQUEST)
      .json(errorResponseBody)
  }
  if (!req.body.confirmPassword) {
    errorResponseBody.err = "confirmPassword is not present in request"
    return res
      .status(STATUS.BAD_REQUEST)
      .json(errorResponseBody)
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    errorResponseBody.err = "password not match with confirm password"
    return res
      .status(STATUS.BAD_REQUEST)
      .json(errorResponseBody)
  }
  next()
}
const isAdminOrClient = async (req, res, next) => {
  const user = await userServices.getUserById(req.user);
  if (user.userRole != USER_ROLE.admin && user.userRole != USER_ROLE.client) {
    errorResponseBody.err = `User is neither a client not an admin, cannot proceed with the request ${user.userRole} `;
    return res.status(STATUS.UNAUTHORISED).json(errorResponseBody);
  }
  next();
}
const isAdmin = (req, res, next) => {
  const user = userServices.getUserById(req.user);
  if (user.userRole != USER_ROLE.admin) {
    errorResponseBody.err = `User is not an admin, cannot proceed with the request`;
    return res.status(STATUS.UNAUTHORISED).json(errorResponseBody);
  }
  next();
}
module.exports = {
  validateRegisterRequest,
  validateSignInRequest,
  isAuthenticate,
  validateResetPassword,
  isAdminOrClient,
  isAdmin,
}