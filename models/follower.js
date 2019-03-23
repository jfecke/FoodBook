var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var FollowerSchema = new Schema({
  // `title` is of type String
  _FollowerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  _UserId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// This creates our model from the above schema, using mongoose's model method
var Follower = mongoose.model("Follower", FollowerSchema);

// Export the Note model
module.exports = Follower;
