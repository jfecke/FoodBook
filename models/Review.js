var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var ReviewSchema = new Schema({
  UserId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  YelpId: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true
  },
  reviewtext: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
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
