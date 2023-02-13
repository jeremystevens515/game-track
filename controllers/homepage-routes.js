const router = require("express").Router();
require("dotenv").config();
const axios = require("axios");
const { response } = require("express");
const { Games } = require("../models");

// get request to / getting game data like name cover and genre of game
router.get("/", async (req, res) => {
	try {
		const gamesData = await Games.findAll({
			attributes: ["name", "cover", "genres"],
		});
		gamesData.forEach((game) => {
			const genresNames = game.genres.map((genre) => genre.name);
			game.genres = JSON.stringify(genresNames);
			game.cover = game.cover.image_id;
			// game.coverImage = game.cover.id
		});
		res.render("homepage", {
			gamesData,
			loggedIn: req.session.loggedIn,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Error retriving the games" });
	}
});

// router.get("/", async (req, res) => {
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

//what the data im receiving looks like just for reference
//[
// games {
//     dataValues: { name: 'God of War', cover: [Object], genres: [Array] },
//     _previousDataValues: { name: 'God of War', cover: [Object], genres: [Array] },
//     uniqno: 1,
//     _changed: Set(0) {},
//     _options: {
//       isNewRecord: false,
//       _schema: null,
//       _schemaDelimiter: '',
//       raw: true,
//       attributes: [Array]
//     },
//     isNewRecord: false
//   },
//   games {
//     dataValues: { name: "Marvel's Spider-Man", cover: [Object], genres: [Array] },
//     _previousDataValues: { name: "Marvel's Spider-Man", cover: [Object], genres: [Array] },
//     uniqno: 1,
//     _changed: Set(0) {},
//     _options: {
//       isNewRecord: false,
//       _schema: null,
//       _schemaDelimiter: '',
//       raw: true,
//       attributes: [Array]
//     },
//     isNewRecord: false
//   }
// ]
