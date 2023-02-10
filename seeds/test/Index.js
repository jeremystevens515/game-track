const sequelize = require("../../config/connection");
const { Users, Reviews, Wishlist, Games } = require("../../models/index");

const userData = require("./test-user-data.json");
const gamesData = require("./test-games-data.json");

const seedDatabase = async () => {
	await sequelize.sync({ force: true });

	// adding users
	const users = await Users.bulkCreate(userData, {
		individualHooks: true, //to hash password
	});

	// adding games
	for (const game in gamesData) {
		await Games.create({
			id: game.id,
			title: game.name,
			publisher: () => {
				for (let company of game.involved_companies) {
					if (company.publisher === true) {
						return company.company.name;
					}
				}
			},
			release_date: game.first_release_date,
			cover_image: game.cover.image_id,
			genre: game.genres,
			platform: game.platforms,
			summary: game.summary,
			storyline: game.storyline,
			rating: game.total_rating,
			rating_count: game.total_rating_count,
			similar_games: game.similar_games,
		});
	}

	process.exit(0);
};
