var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var ReviewSchema = new Schema({
  // `title` is of type String
  _UserId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  _RestaurantId: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant"
  },
  title: String,
  body: String,
  date: {
    type: Date,
    default: Date.now
  }
});

// This creates our model from the above schema, using mongoose's model method
var Review = mongoose.model("Review", ReviewSchema);

// Export the Note model
module.exports = Review;
