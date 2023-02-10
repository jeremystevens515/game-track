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
