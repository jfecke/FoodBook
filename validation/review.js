const Validator = require("validator");
const isEmpty =  require("./is-empty.js");

module.exports = function validateReviewInput(data) {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : "";
    data.body = !isEmpty(data.body) ? data.body : "";

    if (Validator.isEmpty(data.title)) {
        errors.title = "Title field is required";
    }

    if (Validator.isEmpty(data.body)) {
        errors.body = "Revkew field is required";
    }

    if (!Validator.isLength(data.body.trim(), {min: 20, max: 100})) {
        errors.password = "Review must be at least 20 characters";
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}