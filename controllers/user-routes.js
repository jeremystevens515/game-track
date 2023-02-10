const router = require("express").Router();

// GET requests--------------------------------------------------
router.get("/reviews", (req, res) => {
	res.render("../views/user-reviews");
});

// router.get("wishlist", (req, res) => {
// 	res.render("");
// });

// POST requests--------------------------------------------------

module.exports = router;
