const router = require("express").Router();
const restaurantRoutes = require("./restaurants");
const reviewRoutes = require("./reviews");
const userRoutes = require("./users");
const queryRoutes = require("./query")

router.use("/restaurants", restaurantRoutes);
router.use("/users", userRoutes);
router.use("/reviews", reviewRoutes);
router.use("/query", queryRoutes);

module.exports = router;
