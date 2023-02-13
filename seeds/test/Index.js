const sequelize = require("../../config/connection");
const { Users, Reviews, Wishlist, Games } = require("../../models/index");

const userData = require("./test-user-data.json");
const gamesData = require("./test-games-data.json");
const reviewData = require("./test-reviews.json");
const wishlistData = require("./test-wishlist.json");

const seedDatabase = async () => {
	await sequelize.sync({ force: true });
	
// adding games
	for (const game of gamesData) {
		await Games.create({ ...game });
	}
	// adding users
	const users = await Users.bulkCreate(userData, {
		individualHooks: true, //to hash password
	});

	// adding reviews
	const userReviews = await Reviews.bulkCreate(reviewData);

	// adding wishlist
	const userWishlist = await Wishlist.bulkCreate(wishlistData);
	

	process.exit(0);
};

seedDatabase();

//games user revies wishlist 