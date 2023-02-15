const router = require("express").Router();
const { platform } = require("os");
const { Users, Reviews, Wishlist, Games } = require("../models");

// get request to / getting game data like name cover and genre of game
router.get("/", async (req, res) => {
	try {
		const gamesData = await Games.findAll();

		gamesData.forEach((game) => {
			const genresNames = game.genres.map((genre) => genre.name);
			game.genres = genresNames;
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
		const gamesInfo = await gamesData.get({ plain: true });

		gamesInfo.platforms = gamesInfo.platforms.map((platform) => platform.name);

		let imageId;
		if (gamesInfo.cover) {
			imageId = gamesInfo.cover.image_id;
		}

		// for each game in similar games, return object
		// similarGames will be an array of objects
		let similarGames = [];
		console.log(gamesInfo.similar_games);
		for (let gameId of gamesInfo.similar_games) {
			// const title = await sequelize.query(
			// 	`SELECT id, cover->'$.image_id' AS cover, name FROM games WHERE id =${gameId}`
			// );
			const title = await Games.findByPk(gameId, {
				attributes: ["id", "name", "cover"],
			});

			if (title !== null) {
				const gameObject = {
					id: title.id,
					name: title.name,
					cover: title.cover.image_id,
				};

				similarGames.push(gameObject);
			}
		}

		console.log(gamesInfo);
		console.log(similarGames);

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
