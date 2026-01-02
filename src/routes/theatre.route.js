const theatreController = require('../controller/theatre.controller')
const theatreMiddleware = require('../middlewares/theatre.middleware')

const routes = (app) => {
  app.post('/mba/api/v1/theatres',
    theatreMiddleware.validateTheatreCreateRequest,
    theatreController.createTheatre,
  )

  app.patch('/mba/api/v1/theatres/:id', theatreController.updateTheatre)

  app.get('/mba/api/v1/theatres', theatreController.getAllTheatres)

  app.delete('/mba/api/v1/theatres', theatreController.deleteTheatre)

}
module.exports = routes;