const router = require("express").Router();
const sequelize = require("../config/connection");
const { Users, Reviews, Wishlist, Games } = require("../models");
// GET requests--------------------------------------------------
// get reviews page if user logged in
// get reviews based on user id
router.get("/reviews", async (req, res) => {
	// if (!req.session.loggedIn) {
	// 	res.redirect;
	// }
	console.log("user_id reviews:", req.session.user_id);
	try {
		const userReviews = await Reviews.findAll({
			where: {
				user_id: req.session.user_id,
			},
			include: {
				model: Games,
				attributes: ["name", "cover", "total_rating"],
			},
		});
		const plainReviews = await userReviews.map((review) => {
			return review.get({ plain: true });
		});
		console.log("userReviews object: ", plainReviews);
		res.render("../views/user-reviews", { plainReviews });
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/wishlist/", async (req, res) => {
	try {
		const userWishlist = await Wishlist.findAll({
			where: {
				user_id: req.session.user_id,
			},
		});

		const plainWishlist = userWishlist.map((list) => {
			return list.get({ plain: true });
		});
		res.render("user-wishlist", { plainWishlist });
	} catch (err) {
		res.status(500).json(err);
	}
});

// POST requests--------------------------------------------------
// create account
router.post("/create_account", async (req, res) => {
	try {
		const userData = await Users.create(req.body);
		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.loggedIn = true;

			res.status(200).json(userData);
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// login
router.post("/login", async (req, res) => {
	console.log("reqest body: ", req.body);
	try {
		const userData = await Users.findOne({
			// where: {
			// 	[Op.or]: [{ username: req.body.username }, { email: req.body.email }],
			// },
			where: {
				username: req.body.username,
			},
		});

		if (!userData) {
			res.status(400).json({ message: "No user found" });
			return;
		}

		const validatePassword = await userData.checkPassword(req.body.password);

		if (!validatePassword) {
			res.status(400).json({ message: "Incorrect password" });
		}

		// set session variables
		req.session.user_id = userData.id;
		req.session.loggedIn = true;

		console.log(req.session.user_id);
		console.log(req.session.loggedIn);
		res.status(200).json({ message: "successful login!", session: req.session });
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post("/logout", async (req, res) => {
	console.log(req.session);
	if (req.session.loggedIn) {
		req.session.destroy(() => {
			res.status(204).json({ message: "logout successful", session: req.session }).end();
		});
	} else {
		res.status(404).end();
	}
});
module.exports = router;
