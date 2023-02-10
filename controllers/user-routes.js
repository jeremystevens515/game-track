const router = require("express").Router();
const { Users, Reviews, Wishlist, Games } = require("../models");
// GET requests--------------------------------------------------
router.get("/reviews", async (req, res) => {
	const userReviews = await res.render("../views/user-reviews");
});

// router.get("wishlist", (req, res) => {
// 	res.render("");
// });

// POST requests--------------------------------------------------

module.exports = router;
