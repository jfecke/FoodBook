const router = require("express").Router();
const restaurantRoutes = require("./restaurants");
const reviewRoutes = require("./reviews");
const userRoutes = require(".users");

router.use("/restaurants", restaurantRoutes);
router.use("/users", userRoutes);
router.use("/reviews", reviewRoutes);


module.exports = router;
