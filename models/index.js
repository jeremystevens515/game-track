const Users = require("./user/Users");
const Reviews = require("./user/Reviews");
const Wishlist = require("./user/Wishlist");

const Games = require("./games/Games");

// users can only have one wishlist
Users.hasOne(Wishlist);
// a wishlist belongs to one user
Wishlist.belongsTo(Users);

// users can have many reviews
Users.hasMany(Reviews);
// Reviews belong to one user
Reviews.belongsTo(Users);

// one game can have many reviews
Games.hasMany(Reviews);
// a review can only have one game
Reviews.belongsTo(Games);

// a wishlist can have many games
Games.belongsToMany(Wishlist, { through: "GamesWishlist" });
// one game can be on many wishlists
Wishlist.belongsToMany(Games, { through: "GamesWishlist" });

module.exports = {
	Users,
	Reviews,
	Wishlist,
	Games,
};
