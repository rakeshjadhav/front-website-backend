const express = require('express');
const app = express();

const cors = require("cors");
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
const errorHandler = require('./src/middlewares/error-handler'); //_middleware/error-handler
// create express app


app.use(express.json());
app.use(cookieParser());
app.use(cors());
// Setup server port
const port = process.env.PORT || 5000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
// define a root route
app.get('/', (req, res) => {
  res.send("Hello World");
});


// Require users routes
const userRoutes = require('./src/routes/user.routes')

// using as middleware
app.use('/api/users', userRoutes)

app.use(errorHandler);

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});