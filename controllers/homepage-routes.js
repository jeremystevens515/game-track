const router = require("express").Router();
const { Users, Reviews, Wishlist, Games } = require("../models");

// get request to / getting game data like name cover and genre of game
router.get("/", async (req, res) => {
	try {
		const gamesData = await Games.findAll();

		gamesData.forEach((game) => {
			const genresNames = game.genres.map((genre) => genre.name);
			game.genres = JSON.stringify(genresNames);
			game.cover = game.cover.image_id;
		});
		res.render("homepage", {
			gamesData,
			loggedIn: req.session.loggedIn,
			user_id: req.session.user_id,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Error retriving the games" });
	}
});
//get request to take you to a specifics game page based off the games id
router.get("/:id", async (req, res) => {
	try {
		const gamesData = await Games.findOne({
			where: { id: req.params.id },
			include: { model: Reviews },
		});
		// serialize gamesData
		const gamesInfo = gamesData.get({ plain: true });

		let imageId;
		if (gamesInfo.cover) {
			imageId = gamesInfo.cover.image_id;
		}

		// for each game in similar games, return object
		// let similarGames = [];
		console.log(gamesInfo.similar_games);
		gamesInfo.similar_games.forEach(async (gameId) => {
			const title = await sequelize.query(
				`SELECT id, cover->'$.image_id' AS cover, name FROM games WHERE id =${gameId}`
			);
			console.log("title:", title[0]);
			// if (title !== null) {
			// 	similarGames.push(title);
			// }
		});
		res.render("gamepage", {
			gamesInfo,
			imageId,
			similarGames,
			loggedIn: req.session.loggedIn,
			user_id: req.session.user_id,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Error retriving the game info" });
	}
});

module.exports = router;
