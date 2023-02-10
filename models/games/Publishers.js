const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/connection");

class Publishers extends Model {}

Publishers.init(
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
		modelName: "publishers",
	}
);

module.exports = Publishers;
