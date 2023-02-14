const Users = require("./user/Users");
const Reviews = require("./user/Reviews");
const Wishlist = require("./user/Wishlist");

const Games = require("./games/Games");

// users can have many reviews
Users.hasMany(Reviews);
// Reviews belong to one user
Reviews.belongsTo(Users);

// one game can have many reviews
Games.hasMany(Reviews);
// a review can only have one game
Reviews.belongsTo(Games);

// a wishlist can have many games
Games.belongsToMany(Users, { through: Wishlist });
// one game can be on many wishlists
Users.belongsToMany(Games, { through: Wishlist });

module.exports = {
	Users,
	Reviews,
	Wishlist,
	Games,
};
