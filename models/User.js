var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: { index: { unique: true } },
	},
	city: {
		type: String,
		required: true,
	},
	stateName: {
		type: String,
		required: true,
	},
	profilePic: {
		type: String,
		default: "https://picsum.photos/200",
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

var User = mongoose.model("User", UserSchema);

module.exports = User;
