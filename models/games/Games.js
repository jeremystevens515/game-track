const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/connection");

class Games extends Model {}

Games.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		involved_companies: {
			type: DataTypes.JSON,
			allowNull: true,
		},
		first_release_date: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		cover: {
			type: DataTypes.JSON,
			allowNull: true,
		},
		genres: {
			type: DataTypes.JSON,
			allowNull: true,
		},
		platforms: {
			type: DataTypes.JSON,
			allowNull: true,
		},
		summary: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		storyline: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		total_rating: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		total_rating_count: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		similar_games: {
			type: DataTypes.JSON,
			allowNull: true,
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: "games",
	}
);

module.exports = Games;
