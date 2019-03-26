const Validator = require("validator");
const isEmpty = require("./is-empty.js");

module.exports = function validateRegisterInput(data) {
	let errors = {};

	data.name = !isEmpty(data.name) ? data.name : "";
	data.email = !isEmpty(data.email) ? data.email : "";
	data.password = !isEmpty(data.password) ? data.password : "";
	data.password2 = !isEmpty(data.password2) ? data.password2 : "";
	data.city = !isEmpty(data.city) ? data.city : "";
	data.stateName = !isEmpty(data.stateName) ? data.stateName : "";


	if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
		errors.name = "Name must be between 2 and 30 characters";
	}

	if (Validator.isEmpty(data.name)) {
		errors.name = "Name field is required";
	}

	if (Validator.isEmpty(data.email)) {
		errors.email = "Email field is required";
	}

	if (!Validator.isEmail(data.email)) {
		errors.email = "Email is invalid";
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = "Password field is required";
	}

	if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = "Password must be at least 6 characters";
	}

	if (Validator.isEmpty(data.password2)) {
		errors.password2 = "Comfirm Password field is required";
	}

	if (!Validator.equals(data.password, data.password2)) {
		errors.password2 = "Passwords must match";
	}

	if (Validator.isEmpty(data.city)) {
		errors.city = "City field is required";
	}

	if (!Validator.isLength(data.city, { min: 2, max: 30 })) {
		errors.city = "Password must be at least 2 characters";
	}

	if (Validator.isEmpty(data.stateName)) {
		errors.stateName = "State field is required";
	}

	if (!Validator.isLength(data.stateName, { min: 2, max: 2 })) {
		errors.stateName = "State must be 2 characters";
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
};
