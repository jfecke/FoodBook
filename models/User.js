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
	profilepic: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	following: {
		type: Array,
		default: [],
	},
	followedby: {
		type: Array,
		default: [],
	},
});

var User = mongoose.model("User", UserSchema);

module.exports = User;
