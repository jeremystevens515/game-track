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
		res.render("homepage", { gamesData });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Error retriving the games" });
	}
});

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
