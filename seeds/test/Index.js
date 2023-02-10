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
	for (const game of gamesData) {
		await Games.create({ ...game });
	}

	process.exit(0);
};

seedDatabase();
