var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var ReviewSchema = new Schema({
  // `title` is of type String
  UserId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  RestaurantYelpId: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// This creates our model from the above schema, using mongoose's model method
var Review = mongoose.model("Review", ReviewSchema);

// Export the Note model
module.exports = Review;
