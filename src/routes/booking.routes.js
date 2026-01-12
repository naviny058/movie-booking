const bookingController = require('../controller/booking.controller')
const bookingMiddleware = require('../middlewares/booking.middleware')
const authMiddleware = require('../middlewares/auth.middleware')
const route = (app) => {

  app.post('/mba/api/v1/bookings',
    authMiddleware.isAuthenticate,
    bookingMiddleware.validateBookingRequest,
    bookingController.createBooking)

  app.patch('/mba/api/v1/bookings',
    authMiddleware.isAuthenticate,
    bookingMiddleware.canChangeStatus,
    bookingController.updateBooking
  )

  app.get('/mba/api/v1/bookings',
    authMiddleware.isAuthenticate,
    bookingController.getBookings
  )
  app.get('/mba/api/v1/bookings',
    authMiddleware.isAuthenticate,
    authMiddleware.isAdmin,
    bookingController.getAllBooking
  )
  app.get('/mba/api/v1/bookings',
    authMiddleware.isAuthenticate,
    bookingController.getBookingById
  )


}
module.exports = route;