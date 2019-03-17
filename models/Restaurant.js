var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RestaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true,
    unique: { index: { unique: true } }
  },
  phonenumber: {
    type: String,
    required: true,
    unique: { index: { unique: true } }
  },
  link: {
    type: String
  }
});

var Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;
