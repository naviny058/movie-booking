const mongoose = require('mongoose')
/**
 * Defines the schema of theatre resource to be stored in the db
 */
const showSchema = new mongoose.Schema({
  theatreId: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Theatre',
  },
  movieId: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Movie'
  },
  timing: {
    type: String,
    require: true,
  },
  noOfSeats: {
    type: Number,
    required: true,
  },
  seatConfiguration: {
    type: String,
  },
  price: {
    type: Number,
    requried: true,
  },
  format: {
    type: String,
  },
}, { timestamps: true })
const Show = mongoose.model('Show', showSchema);

module.exports = Show;