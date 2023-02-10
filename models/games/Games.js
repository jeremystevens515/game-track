const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/connection");

class Games extends Model {}

Games.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		publisher: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		release_date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		cover_image: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		genre: {
			type: DataTypes.JSON,
			allowNull: false,
		},
		platform: {
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
		rating: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		rating_count: {
			type: DataTypes.INTEGER,
			allowNull: false,
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
