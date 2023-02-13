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
		res.render("user-reviews", { plainReviews });
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/wishlist/:id", async (req, res) => {
	try {
		const userWishlist = await Users.findOne({
			where: {
				id: req.params.id, //req.session.user_id,
			},
			include: {
				model: Games,
				through: Wishlist,
				attributes: ["id", "name", "cover", "total_rating", "summary"]
			}
		});
		console.log(userWishlist);

		const plainWishlist = userWishlist.get({ plain: true });
		console.log("wishlist object: ", plainWishlist)

		const wishListGames = plainWishlist.games;
		console.log(wishListGames);

		// res.status(200).json(userWishlist);
		res.render("user-wishlist", { wishListGames });
	} catch (err) {
		res.status(500).json(err);
	}
});

// POST requests--------------------------------------------------
// create account
router.post("/signup", async (req, res) => {
	try {
		const userData = await Users.create(req.body);
		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.loggedIn = true;
			console.log(req.session);
		});
		if (req.session.loggedIn) {
			res.redirect("/");
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

// login
router.post("/login", async (req, res) => {
	console.log("reqest body: ", req.body);
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

		if (!validatePassword) {
			res.status(400).json({ message: "Incorrect password" });
		}

		// set session variables
		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.loggedIn = true;
			console.log(req.session.user_id);
			console.log(req.session.loggedIn);
			//res.status(200).json({ message: "successful login!", session: req.session });
		});
		if (req.session.loggedIn) {
			res.redirect("/");
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

// Logout
router.post("/logout", async (req, res) => {
	console.log(req.session);
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
	try{
		const gameId = req.body.game_id;

		// Replace "2" with req.session.user_id
		const userId = 2

	const wish = { game_id: gameId, user_id: userId}

	await Wishlist.create(wish)

	res.status(200).json({message: "Success! Game added to Wishlist"})

	} catch(err){
		res.status(500).json(err);
	}
});

// Remove game from Wishlist
router.delete("/wishlist", async(req, res) => {
	console.log('request received', req.body)
	try{
		const gameData = await Wishlist.destroy({
			where: {
				game_id: req.body.id,
				// Replace "2" with req.session.id
				user_id: 2
			}
		});
		if(!gameData){
			res.status(404).json({ message: "This game wasn't on your wishlist"});
			return;
		}
		console.log("\u001b[31mGame removed");
		res.status(200).json(gameData);
	} catch(err) {
		res.status(500).json(err);
	}
});

module.exports = router;
