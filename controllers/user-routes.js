const router = require("express").Router();
const sequelize = require("../config/connection");
const { Users, Reviews, Wishlist, Games } = require("../models");

// GET requests--------------------------------------------------
// get login page
router.get("/login", async (req, res) => {
	res.render("login");
});

// get sign-up page
router.get("/signup", async (req, res) => {
	res.render("signup");
});

// get forgot-password page
router.get("/forgot-password", async (req, res) => {
	res.render("forgot-password");
});

// get reviews page if user logged in
// displays all reviews based on user id
router.get("/reviews", async (req, res) => {
	try {
		const userReviews = await Reviews.findAll({
			where: {
				user_id: req.session.user_id,
			},
			include: {
				model: Games,
				attributes: ["id", "name", "cover", "total_rating"],
			},
		});
		const plainReviews = await userReviews.map((review) => {
			return review.get({ plain: true });
		});
		res.render("user-reviews", {
			plainReviews,
			loggedIn: req.session.loggedIn,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// display one review based on user id and game id
router.get("/reviews/:id", async (req, res) => {
	// console.log(req.session.user_id);
	try {
		const userReview = await Reviews.findOne({
			where: {
				user_id: req.session.user_id,
				game_id: req.params.id,
			},
			include: {
				model: Games,
				attributes: ["id", "name", "cover", "total_rating"],
			},
		});
		const plainReview = await userReview.get({ plain: true });
		res.render("user-reviews-edit", {
			review: plainReview,
			loggedIn: req.session.loggedIn,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/wishlist", async (req, res) => {
	try {
		const userWishlist = await Users.findOne({
			where: {
				id: req.session.user_id,
			},
			include: {
				model: Games,
				through: Wishlist,
				attributes: ["id", "name", "cover", "total_rating", "summary"],
			},
		});
		// console.log(userWishlist);

		const plainWishlist = userWishlist.get({ plain: true });
		// console.log("wishlist object: ", plainWishlist);

		const wishListGames = plainWishlist.games;
		// console.log(wishListGames);

		// res.status(200).json(userWishlist);
		res.render("user-wishlist", { wishListGames, plainWishlist, loggedIn: req.session.loggedIn });
	} catch (err) {
		res.status(500).json(err);
	}
});

// POST requests--------------------------------------------------
// create account
router.post("/signup", async (req, res) => {
	try {
		const newUser = await Users.create(req.body);
		const getNewUser = await Users.findOne({ where: { username: req.body.username } });

		req.session.loggedIn = true;
		req.session.user_id = getNewUser.id;

		res.status(200).json({ message: "great success!" });
	} catch (err) {
		res.status(500).json(err);
	}
});

// login
router.post("/login", async (req, res) => {
	try {
		const userData = await Users.findOne({
			where: {
				username: req.body.username,
			},
		});

		if (!userData) {
			res.status(400).json({ message: "No user found" });
			return;
		}

		const validatePassword = await userData.checkPassword(req.body.password);
		if (validatePassword === false) {
			// console.log("Please enter a valid password");
			res.status(400).json({ message: "Incorrect password" });
			return;
		}

		req.session.user_id = userData.id;
		req.session.loggedIn = true;

		res.status(200).json({ messaged: "successful login" });
	} catch (err) {
		res.status(500).json(err);
	}
});

// Logout
router.post("/logout", async (req, res) => {
	// console.log(req.session);
	try {
		req.session.destroy(() => {
			res.status(204).json({ message: "logout successful", session: req.session }).end();
		});
	} catch (err) {
		res.status(404).end();
	}
});

// Add game to Wishlist
router.post("/wishlist", async (req, res) => {
	// console.log("request received", req.body)
	try {
		const gameId = req.body.game_id;
		const userId = req.session.user_id;

		const wish = { game_id: gameId, user_id: userId };

		await Wishlist.create(wish);

		res.status(200).json({ message: "Success! Game added to Wishlist" });
	} catch (err) {
		res.status(500).json(err);
	}
});

// Add User review for Game
router.post("/reviews", async (req, res) => {
	try {
		const { review_text, game_id, rating } = req.body;
		const user_id = req.session.user_id;
		console.log(req.body, req.session.user_id);
		const review = { game_id: game_id, user_id: user_id, rating: rating, review_text: review_text };

		await Reviews.create(review);

		res.status(200).json({ message: "Review Added!" });
	} catch (err) {
		res.status(500).json(err);
	}
});

// PUT requests--------------------------------------------------
router.put("/reviews/:id", async (req, res) => {
	try {
		const reviewData = await Reviews.update(req.body, {
			where: {
				user_id: req.session.user_id,
				game_id: req.params.id,
			},
		});
		res.status(200).json(reviewData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// DELETE requests--------------------------------------------------
// Remove game from Wishlist
router.delete("/wishlist", async (req, res) => {
	// console.log("request received", req.body);
	try {
		const gameData = await Wishlist.destroy({
			where: {
				game_id: req.body.id,
				user_id: req.session.user_id,
			},
		});
		if (!gameData) {
			res.status(404).json({ message: "This game wasn't on your wishlist" });
			return;
		}
		// console.log("\u001b[31mGame removed");
		res.status(200).json(gameData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
