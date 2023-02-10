const router = require("express").Router();
const { Users, Reviews, Wishlist, Games } = require("../models");
// GET requests--------------------------------------------------
router.get("/reviews", async (req, res) => {
	const userReviews = await Reviews.findAll(
		{
			include: [{ model: Games }],
		},
		{
			where: {
				user_id: req.session.user_id,
			},
		}
	);
	res.render("../views/user-reviews", { userReviews });
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
