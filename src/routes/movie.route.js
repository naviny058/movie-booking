const MovieController = require('../controller/movie.controller')
const MovieMiddleware = require('../middlewares/movie.middleware')
const routes = (app) => {
  // routes function takes express app object as parameter

  // CREATED 
  app.post('/mba/api/v1/movies',
    MovieMiddleware.validateCreateMovieRequest,
    MovieController.createMovie
  )
}
module.exports = routes;