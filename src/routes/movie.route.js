const MovieController = require('../controller/movie.controller')
const MovieMiddleware = require('../middlewares/movie.middleware')
const routes = (app) => {
  // routes function takes express app object as parameter

  // CREATED 
  app.post('/mba/api/v1/movies',
    MovieMiddleware.validateCreateMovieRequest,
    MovieController.createMovie
  )

  //search
  app.get('/mba/api/v1/movies/search',
    MovieController.filterMovies
  )

  //DELETE
  app.delete('/mba/api/v1/movies/:id',
    MovieController.deleteMovie
  )

  //READ
  app.get('/mba/api/v1/movies/:id',
    MovieController.getMovie
  )

  //Read all
  app.get('/mba/api/v1/movies',
    MovieController.fetchMovies
  )
  //update 
  app.patch('/mba/api/v1/movies/:id',
    MovieController.updateMovie
  )

}
module.exports = routes;