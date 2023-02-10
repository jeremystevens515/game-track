const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/connection");

class Wishlist extends Model {}

Wishlist.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		game_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Games,
				key: "game_id",
			},
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Users,
				key: "user_id",
			},
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: "wishlist",
	}
);
