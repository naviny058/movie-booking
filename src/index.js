const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')

const MovieRoutes = require('./routes/movie.route')
const TheatreRoutes = require('./routes/theatre.route')
const UserRoutes = require('./routes/user.route')
console.log(process.env.PORT)
const app = express();


app.use(cors())

// configurign body parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

MovieRoutes(app); // invoking movie routes
TheatreRoutes(app);
UserRoutes(app);

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