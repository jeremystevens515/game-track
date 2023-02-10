const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/connection");

class Reviews extends Model {}

Reviews.init(
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
				model: "games",
				key: "id",
			},
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "users",
				key: "id",
			},
		},
		rating: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		review_text: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		created_at: {
			type: DataTypes.DATE,
			defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: "reviews",
	}
);

module.exports = Reviews;
