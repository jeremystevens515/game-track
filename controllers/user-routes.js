const router = require("express").Router();
const sequelize = require("../config/connection");
const { Users, Reviews, Wishlist, Games } = require("../models");
// GET requests--------------------------------------------------
router.get("/reviews", async (req, res) => {
	//  select reviews.id, reviews.user_id, reviews.rating, reviews.review_text, reviews.created_at,games.name from reviews left join games on reviews.game_id = games.id
	try {
		const userReviews = await Reviews.findAll({
			where: {
				user_id: 1, //req.session.user_id,
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

router.get("/wishlist/:id", async (req, res) => {
	try {
		const userWishlist = await Wishlist.findAll({
			where: {
				user_id: req.params.id,
			},
		});

		const plainWishlist = userWishlist.map((list) => {
			return list.get({ plain: true });
		});
		// res.status(200).json(plainWishlist);
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
	try {
		const userData = await Users.findOne({
			where: {
				[Op.or]: [{ username: req.body.username }, { email: req.body.email }],
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

		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.loggedIn = true;
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post("/logout", async (req, res) => {
	if (req.session.loggedIn) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});
module.exports = router;
