const router = require("express").Router();

const homepageRoutes = require("./homepage-routes");
const userRoutes = require("./user-routes");

router.use("/", homepageRoutes);
router.use("/user", userRoutes);

module.exports = router;
