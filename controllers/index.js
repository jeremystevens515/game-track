const router = require("express").Router();

const homepageRoutes = require("./homepage-routes");
const userRoutes = require("./user-routes");
const searchRoutes = require("./user-routes")

router.use("/", homepageRoutes);
router.use("/user", userRoutes);
router.use('/search', searchRoutes)

module.exports = router;
