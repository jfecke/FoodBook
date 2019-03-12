const router = require("express").Router();
const restaurantController = require("../../controllers/restaurantsController");

// Matches with "/api/books"
router.route("/")
  .get(restaurantController.findAll)
  .post(restaurantController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(restaurantController.findById)
  .put(restaurantController.update)
  .delete(restaurantController.remove);

module.exports = router;
