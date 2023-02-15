const router = require("express").Router();

const homepageRoutes = require("./homepage-routes");
const userRoutes = require("./user-routes");
const searchRoutes = require("./user-routes");
const axiosRoutes = require("./axios-routes");

router.use("/", homepageRoutes);
router.use("/user", userRoutes);
router.use("/search", searchRoutes);
router.use("/axios", axiosRoutes);

module.exports = router;
