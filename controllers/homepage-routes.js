const router = require("express").Router();
const { Users, Reviews, Wishlist, Games } = require("../models");
const { findAll } = require("../models/user/Users");

// get request to / getting game data like name cover and genre of game
router.get("/", async (req, res) => {
	try {
		const gamesData = await Games.findAll({
			attributes: ["name", "cover", "genres", "id"],
		});
		gamesData.forEach((game) => {
			const genresNames = game.genres.map((genre) => genre.name);
			game.genres = JSON.stringify(genresNames);
			game.cover = game.cover.image_id;
		});
		// console.log("homepage: user logged in?", req.session.loggedIn + "\nuser_id:", req.session.user_id);
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
		const gamesInfo = await Games.findOne({
			where: { id: req.params.id },
			attributes: [
				"name",
				"cover",
				"genres",
				"involved_companies",
				"first_release_date",
				"summary",
				"total_rating",
				"similar_games",
			],
		});
		console.log(gamesInfo);
		let imageId;
		if (gamesInfo.cover) {
			imageId = gamesInfo.cover.image_id;
		}
		res.render("gamepage", { gamesInfo, imageId });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Error retriving the game info" });
	}
});

// router.get("/games", async (req, res) => {
// 	axios({
// 		url: "https://api/igdb.com/v4/games",
// 		method: "post",
// 		headers: {
// 			"Client-ID": "beir23ddvqc1dqg8g0myvw79fhzs0b",
// 			"Authorization": "Bearer 9oir2hdkr8f6gung19onrtk2fnwin6",
// 		},
// 		data: `fields id, cover.image_id, first_release_date, genres.name, involved_companies.company.name, involved_companies.publisher, name, platforms.name, similar_games, storyline, summary, total_rating, total_rating_count;
// 		where id = 19560;`,
// 	}).then((response) => {
// 		res
// 			.status(200)
// 			.json(response)
// 			.catch((err) => {
// 				console.error(err);
// 			});
// 	});
// });

module.exports = router;
