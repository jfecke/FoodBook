require("dotenv").config();
const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys.js");

//Load Input Validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// Defining methods for the booksController
module.exports = {
	findAll: function(req, res) {
		db.User.find(req.body)
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	},
	create: function(req, res) {
		const { errors, isValid } = validateRegisterInput(req.body);

		//Check Validation
		if (!isValid) {
			return res.status(400).json(errors);
		}

		db.User.findOne({ email: req.body.email }).then(user => {
			if (user) {
				errors.email = "Email already exists";
				return res.status(400).json(errors);
			} else {
				console.log(req.body);
				//Create object of new user using info received from front end
				const newUser = {
					name: req.body.name,
					email: req.body.email,
					password: req.body.password,
					city: req.body.city,
					stateName: req.body.stateName,
					profilePic: req.body.profilePic,
				};

				bcrypt.genSalt(10, (error, salt) => {
					bcrypt.hash(newUser.password, salt, (error, hash) => {
						if (error) throw error;
						newUser.password = hash;
						console.log(newUser);
						db.User.create(newUser)
							.then(user => {
								res.json({
									name: user.name,
									email: user.email,
									profilePic: user.profilePic,
								});
							})
							.catch(error => console.log(error));
					});
				});
			}
		});
	},
	login: function(req, res) {
		const { errors, isValid } = validateLoginInput(req.body);

		//Check Validation
		if (!isValid) {
			return res.status(400).json(errors);
		}
		const email = req.body.email;
		const password = req.body.password;

		//Find User by Email
		db.User.findOne({ email: email })
			.then(user => {
				if (!user) {
					errors.email = "User not found";
					return res.status(404).json(errors);
				}

				//Check password
				bcrypt.compare(password, user.password).then(isMatch => {
					if (isMatch) {
						//User Matched

						//Create JWT Payload
						const payload = {
							id: user.id,
							name: user.name,
							profilePic: user.profilePic,
						};

						//Sign Token
						jwt.sign(
							payload,
							keys.secrets.secretOrKey,
							{ expiresIn: 3600 },
							(error, token) => {
								res.json({
									success: true,
									token: "Bearer " + token,
								});
							}
						);
					} else {
						errors.password = "Incorrect Password";
						return res.status(400).json(errors);
					}
				});
			})
			.catch(errpr => res.status(422).json(error));
	},
	findById: function(req, res) {
		db.User.findById(req.params.id)
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	},
	update: function(req, res) {
		db.User.findOneAndUpdate({ _id: req.params.id }, req.body)
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	},
	remove: function(req, res) {
		db.User.findById({ _id: req.params.id })
			.then(dbModel => dbModel.remove())
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	},
};
