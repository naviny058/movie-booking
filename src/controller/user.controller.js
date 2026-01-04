const userService = require('../services/user.service')
const { successResponseBody, errorResponseBody } = require('../utills/responsebody')
const { STATUS } = require('../utills/constant')

const createUser = async (req, res) => {
  try {
    const response = await userService.createUser(req.body)
    successResponseBody.data = response;
    return res.status(STATUS.CREATED).json(successResponseBody)
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
const updateUserRoleOrStatus = async (req, res) => {
  try {
    const response = await userService.updateUserRoleOrStatus(req.body, req.params.id);
    successResponseBody.data = response;
    return res.status(STATUS.CREATED).json(successResponseBody)
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

const getUserById = async (req, res) => {
  try {
    const response = await userService.getUserById(req.params.id)
    successResponseBody.data = response;
    return res.status(STATUS.OK).json(successResponseBody)
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
const getUserByEmail = async (req, res) => {
  try {
    const response = await userService.getUserByEmail(req.body.email)
    successResponseBody.data = response;
    return res.status(STATUS.OK).json(successResponseBody)
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

module.exports = {
  createUser,
  updateUserRoleOrStatus,
  getUserByEmail,
  getUserById,
}