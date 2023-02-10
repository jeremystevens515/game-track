const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/connection");

class Platforms extends Model {}

Platforms.init(
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
		modelName: "platforms",
	}
);

module.exports = Platforms;
