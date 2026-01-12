const showServices = require('../services/show.service');
const { STATUS } = require('../utills/constant');
const { successResponseBody, errorResponseBody } = require('../utills/responsebody')

const createShow = async (req, res) => {
  try {
    const show = await showServices.createShow(req.body);
    successResponseBody.message = "Show created successfully "
    successResponseBody.data = show;
    return res.status(STATUS.CREATED).json(successResponseBody)
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res.status(STATUS.OK).json(errorResponseBody);
  }
}
const getShows = async (req, res) => {
  try {
    const response = await showServices.getShows(req.query);
    successResponseBody.data = response;
    successResponseBody.message = "Successfully fetch all the show";
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (error) {
    throw error
  }
}
const deleteShow = async (req, res) => {
  try {
    const response = await showServices.deleteShow(req.params.id);
    successResponseBody.data = response;
    successResponseBody.message = "Successfully deleted the show"
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}
const updateShow = async (req, res) => {
  try {
    const response = showServices.updateShow(req.params.id, req.body);
    successResponseBody.message = "Successfully update the show";
    successResponseBody.data = response;
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    console.log(error);
    errorResponseBody.err = error;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}
module.exports = {
  createShow,
  getShows,
  deleteShow,
  updateShow,
}