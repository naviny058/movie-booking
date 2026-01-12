const userServices = require('../services/user.service')
const jwt = require('jsonwebtoken')

const { successResponseBody, errorResponseBody } = require('../utills/responsebody');
const { STATUS } = require('../utills/constant');
const register = async (req, res) => {
  try {
    const response = await userServices.createUser(req.body);
    successResponseBody.data = response;
    return res.status(201).json(successResponseBody)
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res.status(500).json(errorResponseBody);
  }
}
const signin = async (req, res) => {
  try {
    const user = await userServices.getUserByEmail(req.body.email);
    const checkPassword = await user.isValidPassword(req.body.password);
    if (!checkPassword) {
      throw { err: 'Invalid password for the given email', code: 401 };
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.AUTH_KEY,
      { expiresIn: '1h' }
    )
    successResponseBody.message = 'Successfully logged in '
    successResponseBody.data = {
      email: user.email,
      role: user.userRole,
      status: user.userStatus,
      token: token
    };
    console.log("tok", { token });

    return res.status(STATUS.OK).json(successResponseBody)
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res.status(500).json(errorResponseBody);
  }
}
const reset = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    const user = await userServices.getUserById(req.user);
    const isOldPasswordCorrect = await user.isValidPassword(oldPassword)
    if (!isOldPasswordCorrect) {
      throw { err: 'Invalid old password, please write the correct old password', code: 403 };
    }
    user.password = newPassword;
    await user.save();
    successResponseBody.message = 'Successfully changed password '
    return res.status(STATUS.OK).json(successResponseBody)
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res.status(500).json(errorResponseBody);
  }
}
module.exports = {
  register,
  signin,
  reset,
}