const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/connection");

class Genres extends Model {}

Genres.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: "genres",
	}
);

module.exports = Genres;
