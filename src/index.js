const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')

const movieRoutes = require('./routes/movie.route')
const theatreRoutes = require('./routes/theatre.route')
const userRoutes = require('./routes/user.route')
const authRoutes = require('./routes/auth.route')
const showRoutes = require('./routes/show.route')
const bookingRoutes = require('./routes/booking.routes')

const app = express();


app.use(cors())

// configurign body parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

authRoutes(app);
movieRoutes(app); // invoking movie routes
theatreRoutes(app);
userRoutes(app);
showRoutes(app);
bookingRoutes(app);

app.get('/', (req, res) => {
  res.send('Home')
})

app.listen(process.env.PORT, async () => {
  console.log(`server is listening to the port http://localhost:${process.env.PORT}`)
  try {
    if (process.env.NODE_ENV == 'production') {
      await mongoose.connect(process.env.PROD_DB_URL)
      console.log('Database connected')
    } else {
      await mongoose.connect(process.env.DB_URL)
      console.log('Database connected')
    }
  } catch (error) {
    console.log("Not able to connect mongo", error);
  }
})