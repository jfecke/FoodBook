const db = require("../models");
const validateReviewInput = require("../validation/login");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.Review
      .find(req.query)
      .sort({ date: -1 })
      .then(function(dbModel) {
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Review
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    const {errors, isValid} = validateReviewInput(req.body);

    //Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    
    db.Review.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Review
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Review
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
