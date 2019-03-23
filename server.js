const express = require("express");
const API = require("./routes/utils/API.js")
const mongoose = require("mongoose");
const passport = require("passport");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const passport = require('passport');

// Defines middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);
// app.use('/api/users', users);
// app.use('/api/profile', profile);
// app.use('/api/posts', posts);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/foodbook");

//Passport Middleware
app.use(passport.initialize());

//Passport Config
require("./config/passport")(passport);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

