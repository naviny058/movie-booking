const authMiddleware = require('../middlewares/auth.middleware')
const authController = require('../controller/auth.controller')

const routes = (app) => {

  app.post('/mba/api/v1/auth/register', authMiddleware.validateRegisterRequest, authController.register);
  app.post('/mba/api/v1/auth/signin', authMiddleware.validateSignInRequest, authController.signin);
  app.put("/mba/api/v1/auth/reset", authMiddleware.isAuthenticate,
    authMiddleware.validateResetPassword,
    authController.reset);
}
module.exports = routes;