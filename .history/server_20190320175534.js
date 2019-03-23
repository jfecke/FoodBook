const express = require("express");
const API = require("./routes/utils/API.js")
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const passport = require('passport');

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Passport middleware
app.use(passport.initialize());

// Passport Config
// require('./config/passport')(passport);

// Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }
// Add routes, both API and view
app.use(routes);
// app.use('/api/users', users);
// app.use('/api/profile', profile);
// app.use('/api/posts', posts);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/foodbook");

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

