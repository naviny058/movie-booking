const showController = require('../controller/show.controller')
const showMiddleware = require('../middlewares/show.middleware')
const authMiddleware = require('../middlewares/auth.middleware')

const route = (app) => {
  app.get('/mba/api/v1/show', showController.getShows);

  app.post('/mba/api/v1/show',
    authMiddleware.isAuthenticate,
    authMiddleware.isAdminOrClient,
    showMiddleware.validateShowRequest,
    showController.createShow);

  app.delete('/mba/api/v1/show/:id',
    authMiddleware.isAuthenticate,
    authMiddleware.isAdminOrClient,
    showController.deleteShow);

  app.patch('/mba/api/v1/show/:id',
    authMiddleware.isAuthenticate,
    authMiddleware.isAdminOrClient,
    showMiddleware.validateShowUpdateRequest,
    showController.updateShow);
}
module.exports = route;