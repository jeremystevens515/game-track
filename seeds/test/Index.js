const sequelize = require("../../config/connection");
const { Users, Reviews, Wishlist, Games } = require("../../models");

const userData = require("./test-user-data.json");
const gamesData = require("./test-games-data.json");

const seedDatabase = async () => {
	await sequelize.sync({ force: true });

	const users = await Users.bulkCreate(userData);

	const games = await Games.bulkCreate(gamesData);
};
