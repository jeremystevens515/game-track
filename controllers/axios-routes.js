const router = require("express").Router();
const { Users, Reviews, Wishlist, Games } = require("../models");

router.get("/axios", async (req, res) => {
	const query = req.body;
	try {
		const gameData = await axios({
			url: "https://api/igdb.com/v4/games",
			method: "post",
			headers: {
				"Client-ID": "beir23ddvqc1dqg8g0myvw79fhzs0b",
				"Authorization": "Bearer 9oir2hdkr8f6gung19onrtk2fnwin6",
			},
			data: `fields id, cover.image_id, first_release_date, genres.name, involved_companies.company.name, involved_companies.publisher, name, platforms.name, similar_games, storyline, summary, total_rating, total_rating_count;
			where id = 19560; limit 1;`,
		});
		res.status(200).json(gameData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
