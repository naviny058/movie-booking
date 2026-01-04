const userMiddleware = require('../middlewares/user.middleware')
const userController = require('../controller/user.controller')

const route = (app) => {
  app.get('/mba/api/v1/users/:id', userController.getUserById)
  app.post('/mba/api/v1/users', userController.createUser)
  app.get('/mba/api/v1/users', userController.getUserByEmail)
  app.patch(
    '/mba/api/v1/users/:id',
    userMiddleware.ValidateUserCreateRequest,
    userController.updateUserRoleOrStatus
  )
}
module.exports = route;