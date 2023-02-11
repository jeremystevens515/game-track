const router = require("express").Router();
require("dotenv").config();
const axios = require("axios");
const { response } = require("express");
const { Games } = require("../models");

// get games from igdb api
router.get("/", async (req, res) => {
	try {
		const gamesData = await axios.post("https://api.igdb.com/v4/games", {
			headers: {
				"Client-ID": process.env.API_CLIENT_ID,
				Authorization: process.env.API_AUTHORIZATION,
			},
			data: {
				plain:
					"fields id, cover.image_id, first_release_date, genres.name, involved_companies.company.name, involved_companies.publisher, name, platforms.name, similar_games, storyline, summary, total_rating, total_rating_count; where id = 19560;",
			},
		});
		res.status(200).json(gamesData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// //get request to / getting game data like name cover and genre of game
// router.get("/", async (req, res) => {
// 	try {
// 		const gamesData = await Games.findAll({
// 			attributes: ["name", "cover", "genres"],
// 		});
// 		gamesData.forEach((game) => {
// 			const genresNames = game.genres.map((genre) => genre.name);
// 			game.genres = JSON.stringify(genresNames);
// 			game.cover = game.cover.image_id;
// 			// game.coverImage = game.cover.id
// 		});
// 		res.render("homepage", { gamesData });
// 	} catch (err) {
// 		console.error(err);
// 		res.status(500).json({ message: "Error retriving the games" });
// 	}
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
